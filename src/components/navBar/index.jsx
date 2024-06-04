import React from 'react'
import { Link } from 'react-router-dom'
import { LogoEnuxus } from '../../assets/logoEnexus'
import { CartIcon } from '../../assets/cart'

export function NavBar() {
  return (
    <nav aria-label="Navegação primária">
      <ul className="flex w-full justify-between">
        <div className="flex gap-8">
          <li className="text-fun2 hover:text-rosa-300">
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
          <li>
            <Link to={'/login'}>
              <div className=" h-11 w-11 rounded-full bg-cinza-100"></div>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  )
}
