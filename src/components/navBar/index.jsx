import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LogoEnuxus } from '../../assets/logoEnexus'
import { CartIcon } from '../../assets/cart'
import { useMedia } from '../../hooks/useMedia'
import { MobileMenu } from './menuMobile'
import { UserGlobal } from '../../Contexts/userContext'
import { OneLetterPerfil } from '../OneLetterPerfil'

export function NavBar() {
  const [metchMediaMobile] = useMedia('(max-width:950px)')
  const { user, token, dataPerfilUser, userLogin } = useContext(UserGlobal)
  console.log(dataPerfilUser)
  return (
    <>
      {metchMediaMobile ? (
        <MobileMenu />
      ) : (
        <nav aria-label="Navegação primária">
          <ul className="flex w-full items-center justify-between text-cinza-500 ">
            <div className="flex gap-8">
              <li className="text-fun2 after:w-0 after:duration-200 hover:text-cinza-950 ">
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
              <li aria-label="login">
                {!userLogin && !token ? (
                  <Link to={'/login'}>Fazer logins</Link>
                ) : dataPerfilUser?.photo ? (
                  <img src={dataPerfilUser.photo} alt="" />
                ) : (
                  <div className=" h-11 w-11 rounded-full bg-cinza-100">
                    <OneLetterPerfil name={dataPerfilUser?.name} />
                  </div>
                )}
              </li>
            </div>
          </ul>
        </nav>
      )}
    </>
  )
}
