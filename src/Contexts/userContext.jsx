import React, { createContext, useMemo } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import { useMutation } from '@tanstack/react-query'
import { toastifyContext } from './toastifyContext'
import { useCookies } from '../hooks/useCookies'

export const UserGlobal = createContext()

export const UserProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_API_URL
  const { requestApi } = useAxios()
  const [user, setUser] = useCookies('user', null)
  const [token, setToken] = useCookies('token', null)
  const userLogin = useMemo(() => !!user, [user])
  const { Notification } = React.useContext(toastifyContext)

  const navegar = useNavigate()
  const url = useLocation()

  async function userLoginRequest(dataUserLogin) {
    const response = await requestApi(
      `${BASE_URL}/aluno/login`,
      dataUserLogin,
      'POST',
      null,
    )
    return response
  }

  const mutateUserLogin = useMutation({
    mutationFn: userLoginRequest,
    mutationKey: ['userLogin'],
    onSuccess: (res) => {
      setToken(res.json.response.token)
      setUser(res.json.response.NIF)
      Notification('success', 'logado com sucesso')
      navegar('/')
    },
    onError: (res) => {
      console.log('error', res)
      Notification('error', 'Verifique o email e senha')
    },
    onLoading: () => {
      Notification('loading', 'carregado')
    },
  })

  async function userLogoutRequest() {
    try {
      const response = await axios.post(
        `${BASE_URL}/funcionario/deslogar`,
        null,
        {
          headers: {
            nif: user,
            authorization: `bearer ${token}`,
          },
        },
      )

      if (response && response.status === 200) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navegar('/login')
        return true
      }
    } catch (error) {}
  }

  const userLogoutMutate = useMutation({
    mutationFn: userLogoutRequest,
    onSuccess: () => {
      setUser(null)
      setToken(null)
      Notification('succes', 'usuário deslogado com sucesso')
    },
    onError: () => {
      Notification(
        'error',
        'não foi possível deslogar, tente novamente mais tarde',
      )
    },
  })

  return (
    <UserGlobal.Provider
      value={{
        user,
        token,
        userLogin,
        mutateUserLogin,
        userLogoutRequest,
      }}
    >
      {children}
    </UserGlobal.Provider>
  )
}
