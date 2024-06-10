/* eslint-disable no-sequences */
import React from 'react'
import useAxios from '../hooks/useAxios'
import { UserGlobal } from './userContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toastifyContext } from './toastifyContext'
import { useNavigate } from 'react-router-dom'

export const cartContext = React.createContext()

export function CartProvider({ children }) {
  const { user, token, dataPerfilUser, userLogin } =
    React.useContext(UserGlobal)
  const { Notification } = React.useContext(toastifyContext)
  const BASE_URL = import.meta.env.VITE_API_URL
  const { requestApi } = useAxios()
  const Navigate = useNavigate()
  const queryClient = useQueryClient()

  async function FetchAllProductsCart() {
    try {
      const requestPostProduct = await requestApi(
        `${BASE_URL}/aluno/carrinhoCompras`,
        null,
        'GET',
        {
          authorization: `bearer ${token}`,
          id_aluno: user,
        },
      )
      return requestPostProduct
    } catch (err) {
      console.log(err)
    }
  }

  async function FetchAddProductCart(dataProduct) {
    try {
      const requestPostProduct = await requestApi(
        `${BASE_URL}/aluno/carrinhoCompras/adicionar`,
        dataProduct,
        'PATCH',
        {
          authorization: `bearer ${token}`,
          id_aluno: user,
        },
      )
      console.log(requestPostProduct)
      return requestPostProduct
    } catch (error) {
      console.log('error', error)
    }
  }

  const queryAllProductCart = useQuery({
    queryFn: FetchAllProductsCart,
    queryKey: ['allProductCart'],
  })

  const mutateAddProductCart = useMutation({
    mutationFn: FetchAddProductCart,
    onSuccess: () => {
      // eslint-disable-next-line no-unused-expressions
      queryClient.invalidateQueries(['allProductCart']),
        Notification('success', 'Produto adicionado ao carrinho')
      Navigate('/carrinho')
    },
    onError: () => {
      Notification('error', 'Ocorreu um erro, tente novamente')
    },
  })

  const allProductsGroup =
    queryAllProductCart.data &&
    Object.entries(queryAllProductCart.data.json.response)

  return (
    <cartContext.Provider value={{ mutateAddProductCart, allProductsGroup }}>
      {children}
    </cartContext.Provider>
  )
}
