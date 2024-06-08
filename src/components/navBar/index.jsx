import React from 'react'
import { Link } from 'react-router-dom'
import { LogoEnuxus } from '../../assets/logoEnexus'
import { CartIcon } from '../../assets/cart'
import { useMedia } from '../../hooks/useMedia'
import { MobileMenu } from './menuMobile'

export function NavBar() {
  const [metchMediaMobile] = useMedia('(max-width:950px)')

  return (
    <>
      {metchMediaMobile ? (
        <MobileMenu />
      ) : (
        <nav aria-label="Navegação primária">
          <ul className="flex w-full justify-between text-cinza-500 ">
            <div className="flex gap-8">
              <li className="text-fun2 after:w-0 hover:text-cinza-950 hover:after:block hover:after:h-1 hover:after:w-1/4 hover:after:bg-cinza-950 after:duration-200">
                <Link to={'/'}>Produtos</Link>
              </li>
              <li className=" text-fun2">
                <Link to={'/'}>Sobre</Link>
              </li>
            </div>

            <div>
              <li>
                <Link to={'/'}>
                  <LogoEnuxus />
                </Link>
              </li>
            </div>

            <div className="flex items-center gap-8">
              <li>
                <Link to={'/carrinho'}>
                  <CartIcon />
                </Link>
              </li>
              <li aria-label='login'>
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
