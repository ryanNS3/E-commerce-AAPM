import React from 'react'
import useAxios from '../hooks/useAxios'
import { useQuery } from '@tanstack/react-query'

export const productContext = React.createContext()

export function ProductProvider({ children }) {
  const BASE_URL = import.meta.env.VITE_API_URL
  const { requestApi } = useAxios()
  const [selectedProduct, setSelectedProduct] = React.useState(null)

  const useGroupDataProducts = (resProductData) => {
    const [groupProduct, setGroupProduct] = React.useState(null)

    React.useEffect(() => {
      if (
        resProductData &&
        resProductData.json &&
        resProductData.json.response
      ) {
        const groupedProducts = resProductData?.json?.response?.reduce(
          (acc, product) => {
            if (!acc[product.nome]) {
              acc[product.nome] = {
                nome: product.nome,
                descricao: product.descricao,
                porcentagem: product.porcentagem,
                desconto_associado: product.desconto_associado,
                brinde: product.brinde,
                produtos: [],
              }
            }

            const existingProduct = acc[product.nome].produtos.find(
              (p) => p.cor === product.cor,
            )

            const uniqueFotos = [...new Set(product.foto)]

            if (existingProduct) {
              existingProduct.tamanhos.push({
                id_produto: product.id_produto,
                tamanho: product.tamanho,
                qtd_estoque: product.qtd_estoque,
                qtd_reservada: product.qtd_reservada,
                valor: product.valor,
              })
              existingProduct.fotos.push(...uniqueFotos)
            } else {
              acc[product.nome].produtos.push({
                cor: product.cor,
                tamanhos: [
                  {
                    id_produto: product.id_produto,
                    tamanho: product.tamanho,
                    qtd_estoque: product.qtd_estoque,
                    qtd_reservada: product.qtd_reservada,
                    valor: product.valor,
                  },
                ],
                fotos: uniqueFotos,
              })
            }

            return acc
          },
          {},
        )

        const result = Object.values(groupedProducts)
        setGroupProduct(result)
      }
    }, [resProductData])

    return { groupProduct }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps

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

  const { groupProduct } = useGroupDataProducts(allProductsQuery?.data)

  function useFilteredProducts(productParamsName) {
    const [resultFilteredProduct, setResultFilteredProduct] =
      React.useState(null)

    React.useEffect(() => {
      const decodedProductParamsName = decodeURIComponent(productParamsName)
      if (groupProduct && decodedProductParamsName) {
        setResultFilteredProduct(
          groupProduct?.filter(
            (product) => product?.nome === decodedProductParamsName,
          ),
        )
      }
    }, [productParamsName, groupProduct])
    return resultFilteredProduct
  }

  return (
    <productContext.Provider
      value={{
        sizes,
        allProductsQuery,
        selectedProduct,
        groupProduct,
        useFilteredProducts,
        setSelectedProduct,
      }}
    >
      {children}
    </productContext.Provider>
  )
}
