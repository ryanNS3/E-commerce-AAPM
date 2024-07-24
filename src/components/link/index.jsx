import React from 'react'
import { Link } from 'react-router-dom'

export function PrimaryLink({ text, to, ...props }) {
  // Definir o tamanho do botão

  return (
    <Link
      to={to}
      className={`focus:shadow-outline flex transform items-center justify-center rounded-[4px] bg-gradient-to-r  from-[#BD3FD1] to-[#9332AE] px-2 py-1 text-fun2 uppercase text-cinza-50 transition duration-300 hover:scale-105 focus:outline-none active:scale-100 active:border-[#2bec55] sm:px-5 sm:py-3 md:px-7`}
      {...props}
    >
      {text}
    </Link>
  )
}
