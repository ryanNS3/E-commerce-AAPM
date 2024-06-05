import React from 'react'

import { Link } from 'react-router-dom'
import { LogoEnuxus } from '../../../assets/logoEnexus'
import { CartIcon } from '../../../assets/cart'

export function MobileMenu() {
  const [isActiveMobileMenu, setIsActiveMobileMenu] = React.useState(false)
  const stylesActiveMenu = ''
  return (
    <>
      <div className=' w-full flex  items-center'>
        <button className=" after:block after:h-1 after:w-6 after:rounded after:bg-preto "></button>
        <div className=' mx-auto'>
          <Link to={'/'}>
            <LogoEnuxus />
          </Link>
        </div>
      </div>
      {isActiveMobileMenu && (
        <nav
          className=" absolute h-full w-full backdrop-blur"
          aria-label="Navegação primária"
        >
          <ul className="flex w-full flex-col justify-between">
            <div className="flex gap-8">
              <li className="text-fun2 hover:text-rosa-300">
                <Link to={'/'}>Produtos</Link>
              </li>
              <li className=" text-fun2">
                <Link to={'/'}>Sobre</Link>
              </li>
            </div>

            <div className="flex items-center gap-8">
              <li>
                <Link to={'/carrinho'}>
                  <CartIcon />
                </Link>
              </li>
              <li>
                <Link to={'/login'}>
                  <div className=" h-11 w-11 rounded-full bg-cinza-100"></div>
                </Link>
              </li>
            </div>
          </ul>
        </nav>
      )}
    </>
  )
}
