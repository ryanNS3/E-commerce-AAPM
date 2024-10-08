import axios from 'axios'
import React from 'react'

const useAxios = () => {
  const [dados, setDados] = React.useState(null)
  const [erro, setErro] = React.useState(null)
  const [loading, setLoading] = React.useState(null)

  const requestApi = React.useCallback(async (url, dados, metodo, headers) => {
    try {
      setErro(null)
      setLoading(true)
      const res = await axios({
        method: metodo,
        url,
        data: dados,
        headers,
      })
      setDados(res.data)
      return { res, json: res.data }
    } catch (err) {
      throw err
      // setErro(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { dados, loading, erro, requestApi }
}

export default useAxios
