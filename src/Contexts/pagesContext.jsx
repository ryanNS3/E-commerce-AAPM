import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const pagesContext = React.createContext()

export function PagesProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const previousLocation = React.useRef(null)

  React.useEffect(() => {
    previousLocation.current = location.pathname
  }, [location])

  function handleBackClick() {
    if (previousLocation.current) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <pagesContext.Provider value={{ handleBackClick }}>
      {children}
    </pagesContext.Provider>
  )
}
