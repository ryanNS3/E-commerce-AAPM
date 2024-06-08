import React from 'react'
import useAxios from '../hooks/useAxios'
import { useQuery } from '@tanstack/react-query'

export const productContext = React.createContext()

export function ProductProvider({ children }) {
  const BASE_URL = import.meta.env.VITE_API_URL
  const { requestApi } = useAxios()
  const [selectedProduct, setSelectedProduct] = React.useState(null)

  const sizes = [
    {
      size: 'PP',
    },
    {
      size: 'P',
    },
    {
      size: 'M',
    },
    {
      size: 'G',
    },
    {
      size: 'GG',
    },
  ]

  async function FetchAllProduct() {
    const requestApiGetAllProduct = await requestApi(
      `${BASE_URL}/produto/todosAtivos`,
      null,
      'GET',
    )

    return requestApiGetAllProduct
  }

  const allProductsQuery = useQuery({
    queryFn: FetchAllProduct,
    queryKey: ['allProducts'],
    
  })

  return (
    <productContext.Provider value={{ sizes, allProductsQuery, selectedProduct, setSelectedProduct }}>
      {children}
    </productContext.Provider>
  )
}
