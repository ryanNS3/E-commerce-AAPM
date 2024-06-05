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
      localStorage.setItem('token', res.json.response.token)
      setUser(res.json.response.NIF)
      localStorage.setItem('user', res.json.response.NIF)
      Notification('success', 'logado com sucesso')
      navegar("/")
    },
    onError: (res) => {
      console.log("error",res)
      Notification('error', 'Verifique o email e senha')
    },
    onLoading : () =>{
      Notification("loading", "carregado")
    }

    
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
