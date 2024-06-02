import React from 'react'

export const productContext = React.createContext()

export function ProductProvider({ children }) {
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

  return (
    <productContext.Provider value={{ sizes }}>
      {children}
    </productContext.Provider>
  )
}
