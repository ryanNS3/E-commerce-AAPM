import React from 'react'
import Cookies from 'js-cookie'

export const useCookies = (key, defaultValue, options = {}) => {
  const [value, setValue] = React.useState(() => {
    const cookie = Cookies.get(key)
    try {
      return cookie ? JSON.parse(cookie) : defaultValue
    } catch (e) {
      return defaultValue
    }
  })

  React.useEffect(() => {
    if (value === undefined || value === null) {
      Cookies.remove(key, options)
    } else {
      Cookies.set(key, JSON.stringify(value), options)
    }
  }, [key, value, options])

  return [value, setValue]
}
