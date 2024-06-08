import React from 'react'
import { Link } from 'react-router-dom'
import { LogoEnuxus } from '../../../assets/logoEnexus'
import { CartIcon } from '../../../assets/cart'
import { motion, AnimatePresence } from 'framer-motion'

export function MobileMenu() {
  const [isActiveMobileMenu, setIsActiveMobileMenu] = React.useState(false)

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2, // delay each item by 0.2s more than the previous item
      },
    }),
  }

  return (
    <>
      <nav
        className={`flex w-full items-center  bg-[#ffffff98] p-2    px-4 ${
          isActiveMobileMenu
            ? 'static'
            : 'fixed left-0 top-0 z-10 backdrop-blur-lg'
        }`}
        aria-label="Navegação primária"
      >
        <div className={'flex  w-full items-center justify-between'}>
          <div
            className={` z-[99999]  flex ${isActiveMobileMenu ? 'fixed top-4 sm:left-4' : ''}`}
          >
            <button
              onClick={() => setIsActiveMobileMenu(!isActiveMobileMenu)}
              className={` ${
                isActiveMobileMenu
                  ? ' before:absolute before:top-[50%] before:-rotate-45 after:rotate-45'
                  : ''
              }  before:block before:h-[0.2rem] before:w-6 before:rounded before:bg-preto before:duration-200  after:mt-1 after:block after:h-[0.2rem] after:w-6 after:rounded after:bg-preto  after:duration-200  `}
              aria-label="abrir menu mobile"
            ></button>
            {/* {isActiveMobileMenu && <Label>Fechar modal</Label>} */}
          </div>

          <div className=" mx-auto">
            <Link to={'/'}>
              <LogoEnuxus width="33" height="30" />
            </Link>
          </div>

          <Link to={'/login'} className=" text-c3 rounded border-2 border-cinza-200 px-4 py-1  duration-200 hover:bg-cinza-200 hover:text-preto">
            Entrar
          </Link>
        </div>
      </nav>

      <AnimatePresence>
        {isActiveMobileMenu && (
          <motion.nav
            className="fixed -top-9 bottom-0 left-0 right-0 z-[99] h-screen  w-full bg-[#f9f9f9ec] backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="fixed h-full w-full flex-col px-5">
              <ul className=" mt-16 flex h-3/4 flex-col  text-cinza-500 text-fun2 ">
                {['Produtos', 'Sobre', 'Carrinho'].map((text, i) => (
                  <motion.li
                    key={text}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    className="p-2 text-sub2 hover:text-rosa-300"
                    onClick={() => setIsActiveMobileMenu(false)}
                    >
                    <Link className=' flex gap-2' to={text === 'Carrinho' ? '/carrinho' : '/'}>
                      {text === 'Carrinho' ? "" : null}
                      {text}
                    </Link>
                  </motion.li>
                ))}

                <div className="flex items-center gap-8">
                  <motion.li
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    className="p-2 text-sub2 hover:text-rosa-300"
                    // className=" w-full rounded-md border-2 border-cinza-100"
                    onClick={() => setIsActiveMobileMenu(false)}
                  >
                    <Link  to={'/login'}>
                      {/* <div className=" h-11 w-11 rounded-full bg-cinza-100"></div> */}
                      Entrar
                    </Link>
                  </motion.li>
                </div>
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
