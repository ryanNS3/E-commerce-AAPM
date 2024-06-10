import React, { useState, useEffect, useContext, createContext } from 'react'
import useAxios from '../hooks/useAxios'
import { UserGlobal } from './userContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toastifyContext } from './toastifyContext'
import { useNavigate } from 'react-router-dom'

export const cartContext = createContext()

export function CartProvider({ children }) {
  const { user, token } = useContext(UserGlobal)
  const { Notification } = useContext(toastifyContext)
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
      console.error('Error fetching all products in cart:', err)
      return null // Retorna um array vazio em caso de erro para evitar o retorno undefined
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
      return requestPostProduct
    } catch (error) {
      console.log('error', error)
    }
  }

  async function FetchRemoveProductCart(idProduct) {
    try {
      const requestPatchProductFromCart = await requestApi(
        `${BASE_URL}/aluno/carrinhoCompras/remover`,
        idProduct,
        'PATCH',
        {
          authorization: `bearer ${token}`,
          id_aluno: user,
        },
      )
      return requestPatchProductFromCart
    } catch (error) {
      console.log(error)
    }
  }

  async function FetchPostSchedulingCart(dataOfScheduling) {
    try {
      const requestPostScheduling = await requestApi(
        `${BASE_URL}/aluno/CarrinhoCompras/`,
        dataOfScheduling,
        {
          authorization: `bearer ${token}`,
          id_aluno: user,
        },
      )

      return requestPostScheduling
    } catch (error) {
      console.log(error)
    }
  }

  const queryAllProductCart = useQuery({
    queryFn: FetchAllProductsCart,
    queryKey: ['allProductCart'],
    onError: (error) => {
      console.error('Error fetching all products in cart:', error)
      Notification(
        'error',
        'Erro ao buscar produtos do carrinho. Tente novamente mais tarde.',
      )
    },
  })

  const mutateAddProductCart = useMutation({
    mutationFn: FetchAddProductCart,
    onSuccess: () => {
      queryClient.invalidateQueries(['allProductCart'])
      Notification('success', 'Produto adicionado ao carrinho')
      Navigate('/carrinho')
    },
    onError: () => {
      Notification('error', 'Ocorreu um erro, tente novamente')
    },
  })

  const mutateDeleteProductCart = useMutation({
    mutationFn: FetchRemoveProductCart,
    onSuccess: () => {
      queryClient.invalidateQueries(['allProductCart'])
      Notification('success', 'Produto removido')
    },
    onError: () => {
      Notification('error', 'Erro ao remover! Tente novamente')
    },
  })

  const mutatePostScheduling = useMutation({
    mutationFn: FetchPostSchedulingCart,
    onSuccess: () => {
      queryClient.invalidateQueries(['allProductCart'])
      Notification('success', 'Agendamento realizado com sucesso')
      Navigate('/carrinho')
    },
    onError: () => {
      Notification('error', 'Não foi possível fazer o agendamento')
    },
  })

  function useFilteredProductFromCart() {
    const [allProductsGroup, setAllProductsGroup] = useState()
    const [productFilterWithoutValue, setProductFilterWithoutValue] = useState()
    const [filterValue, setFilterValue] = useState()

    useEffect(() => {
      if (queryAllProductCart.data) {
        console.log(queryAllProductCart)
        const products = Object.entries(
          queryAllProductCart?.data?.json?.response,
        )
        setAllProductsGroup(products)
        setProductFilterWithoutValue(
          products.filter((item) => item[0] !== 'valor'),
        )
        setFilterValue(products.filter((item) => item[0] === 'valor'))
      }
    }, [queryAllProductCart.data])

    return { allProductsGroup, productFilterWithoutValue, filterValue }
  }

  const { allProductsGroup, productFilterWithoutValue, filterValue } =
    useFilteredProductFromCart()

  return (
    <cartContext.Provider
      value={{
        mutateAddProductCart,
        mutatePostScheduling,
        mutateDeleteProductCart,
        allProductsGroup,
        productFilterWithoutValue,
        filterValue,
      }}
    >
      {children}
    </cartContext.Provider>
  )
}
