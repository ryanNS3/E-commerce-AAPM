import React, { createContext, useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import { useMutation } from '@tanstack/react-query'
import { toastifyContext } from './toastifyContext'

export const UserGlobal = createContext()

export const UserProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_API_URL
  const { requestApi } = useAxios()
  const [user, setUser] = useState(localStorage.getItem('user'))
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [error, setError] = useState(null)
  const userLogin = useMemo(() => !!user, [user])
  const { Notification } = React.useContext(toastifyContext)

  const navegar = useNavigate()
  const url = useLocation()

  async function userLoginRequest(dataUserLogin) {
    setLoading(true)
    try {
      const response = await requestApi(
        `${BASE_URL}/aluno/login`,
        dataUserLogin,
        'POST',
        null,
      )
      return response
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Email ou senha inválidos. Tente novamente.')
      } else if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(
          error.response.data.message ||
            'Erro durante o login. Por favor, tente novamente.',
        )
      }
    }
  }

  const mutateUserLogin = useMutation({
    mutationFn: userLoginRequest,
    mutationKey: ['userLogin'],
    onSuccess: (res) => {
      setToken(res.data.response.token)
      localStorage.setItem('token', res.data.response.token)
      setUser(res.data.response.NIF)
      localStorage.setItem('user', res.data.response.NIF)
      Notification('success', 'logado com sucesso')
    },
    onError: () => {
      Notification('error', 'Verifique o email e senha')
    },
  })

  async function userLogoutRequest() {
    setLoading(true)
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
    } catch (error) {
      if (error.response && error.response.status === 400) {
      } else if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        return false
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <UserGlobal.Provider
      value={{
        user,
        token,
        userLogin,
        loading,
        error,
        mutateUserLogin,
        userLogoutRequest,
      }}
    >
      {children}
    </UserGlobal.Provider>
  )
}
