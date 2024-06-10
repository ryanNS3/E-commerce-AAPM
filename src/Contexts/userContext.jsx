import React, { createContext, useMemo } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import { useMutation } from '@tanstack/react-query'
import { toastifyContext } from './toastifyContext'
import { useCookies } from '../hooks/useCookies'
import { pagesContext } from './pagesContext'

export const UserGlobal = createContext()

export const UserProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_API_URL
  const { handleBackClick } = React.useContext(pagesContext)
  const { requestApi } = useAxios()
  const [userString, setUserString] = useCookies('user', null)
  const [token, setToken] = useCookies('token', null)
  const [dataPerfilUser, setDataPerfilUser] = useCookies('perfilUser', null)
  const user = userString === 'null' ? null : userString
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
        navegar('/login')
        return true
      }
    } catch (error) {}
  }

  async function FetchResetPassword(token, senha){
    try {
      const res = await requestApi(
        `${BASE_URL}/smtp/definirSenha/${token}`,
        { senha },
        `POST`,
        null,
      )
      if (res && res.res.status === 200) {
        return true
      }
    } catch (error) {
      return false
    }
  }

  const mutateUserLogin = useMutation({
    mutationFn: userLoginRequest,
    mutationKey: ['userLogin'],
    onSuccess: (res) => {
      setToken(res.json.response.token)
      setUserString(res.json.response.id_aluno)
      setDataPerfilUser({
        name: res.json.response.nome,
        email: res.json.response.email,
        photo: res.json.response.foto,
        phone: res.json.response.telefone_celular,
        course: res.json.response.curso,
        associate: res.json.response.associado,
      })
      Notification('success', 'logado com sucesso')
      handleBackClick()
    },
    onError: () => {
      Notification('error', 'Verifique o email e senha')
    },
    onLoading: () => {
      Notification('loading', 'carregado')
    },
  })

  const userLogoutMutate = useMutation({
    mutationFn: userLogoutRequest,
    onSuccess: () => {
      setUserString(null)
      setToken(null)
      setDataPerfilUser(null)
      Notification('succes', 'Usuário deslogado com sucesso')
    },
    onError: () => {
      Notification(
        'error',
        'Não foi possível deslogar, tente novamente mais tarde',
      )
    },
  })

  const userResetPasswordMutate = useMutation({
    mutationFn: FetchResetPassword
  })
  return (
    <UserGlobal.Provider
      value={{
        user,
        token,
        dataPerfilUser,
        userLogin,
        mutateUserLogin,
        userLogoutMutate,
      }}
    >
      {children}
    </UserGlobal.Provider>
  )
}
