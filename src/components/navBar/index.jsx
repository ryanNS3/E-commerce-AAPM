import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LogoEnuxus } from '../../assets/logoEnexus'
import { CartIcon } from '../../assets/cart'
import { useMedia } from '../../hooks/useMedia'
import { MobileMenu } from './menuMobile'
import { UserGlobal } from '../../Contexts/userContext'
import { OneLetterPerfil } from '../OneLetterPerfil'

export function NavBar() {
  const [metchMediaMobile] = useMedia('(max-width:950px)')
  const { token, dataPerfilUser, userLogin } = React.useContext(UserGlobal)
  const [activePage, setActivePage] = React.useState("/")
  const links = ['associado', 'produtos', 'sobre']
  const page = useLocation()
  console.log(page)
  React.useEffect(() =>{
    setActivePage(page.pathname)
    switch (page.pathname){
      case "/":
    }
  }, [page])
  return (
    <>
      {metchMediaMobile ? (
        <MobileMenu />
      ) : (
        <nav
          className=" sticky  left-0 right-0 top-8 w-full bg-[#f1f1f100] backdrop-blur-lg"
          aria-label="Navegação primária"
        >
          <ul className="flex w-full items-center justify-between text-cinza-500 ">
            <ul className="flex gap-8">
              <li className=" text-fun2">
                <Link to={'/associado'}>Associado</Link>
              </li>
              <li className="text-fun2 after:w-0 after:duration-200 hover:text-cinza-950 ">
                <Link to={'/'}>Produtos</Link>
              </li>
              <li className=" text-fun2">
                <Link to={'/'}>Sobre</Link>
              </li>
            </ul>

            <ul>
              <li>
                <Link className=' hover:rotate-2' to={'/'}>
                  <LogoEnuxus />
                </Link>
              </li>
            </ul>

            <ul className="flex items-center gap-8">
              <li>
                <Link to={'/carrinho'}>
                  <CartIcon />
                </Link>
              </li>
              <li aria-label="login">
                {!userLogin && !token ? (
                  <Link to={'/login'}>Fazer login</Link>
                ) : dataPerfilUser?.photo ? (
                  <img src={dataPerfilUser.photo} alt="" />
                ) : (
                  <Link to={'/perfil'}>
                    <OneLetterPerfil name={dataPerfilUser?.name} />
                  </Link>
                )}
              </li>
            </ul>
          </ul>
        </nav>
      )}
    </>
  )
}
