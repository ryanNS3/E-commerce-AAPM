import React, { useEffect, useState, useRef, useContext } from 'react'

import { Square } from '../components/square'
import camiseta from '../assets/fotoTesteCamiseta.png'
import { PixLogo } from '../assets/icons/pix'
import { CardIcon, CreditCardIcon, DebitCardIcon } from '../assets/icons/card'
import { MoneyIcon } from '../assets/icons/money'
import { PrimaryButton } from '../components/buttons/primaryButton'
import { productContext } from '../Contexts/productContext'
import { useNavigate, useParams } from 'react-router-dom'

export function Product() {
  const { useFilteredProducts, sizes } = React.useContext(productContext)

  const productParams = useParams()
  const [paymentMethod, setPaymentMethod] = useState(null)
  const endCodeProductId = encodeURIComponent(productParams.id)
  const uniqueProduct = useFilteredProducts(endCodeProductId)
  const [colorProduct, setColorProduct] = useState()
  const [colorIdProduct, setColorIdProduct] = useState(0)
  const allColorsProduct = uniqueProduct?.[0]?.produtos?.map(
    (product) => product.cor,
  )
  const [sizeProduct, setSizeProduct] = useState(null)

  const refImage = useRef()
  const [isTopPageProduct, setIsTopPageProduct] = useState(false)
  const Navigate = useNavigate()

  console.log(uniqueProduct)

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY
      const refOffsetTop = refImage?.current?.offsetTop

      if (scrollPosition >= refOffsetTop) {
        setIsTopPageProduct(true)
      } else {
        setIsTopPageProduct(false)
      }
    }
    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleSelectedMethodPayment(event) {
    event.preventDefault()
    const payment = event.target.dataset.value
    setPaymentMethod(payment)
  }

  function handleSelectedColorProduct(event) {
    event.preventDefault()
    const color = event.target.dataset.value
    setColorProduct(color)
    setColorIdProduct(
      uniqueProduct[0].produtos.map((product) => {
        if (color == product.cor) {
          return allColorsProduct.indexOf(product.cor)
        }
      }),
    )
  }

  function handleSelectedSizeProduct(event) {
    event.preventDefault()
    const size = event.target.dataset.value
    setSizeProduct(size)
  }

  return (
    <main className=" mx-4 grid gap-8 md:gap-14 lg:grid-cols-2 lg:gap-28">
      {uniqueProduct && (
        <>
          <div className={`${isTopPageProduct ? '  lg:h-[50%]' : 'hidden'}`} />
          <section
            ref={refImage}
            className={` ${isTopPageProduct ? ' lg:fixed lg:left-36 lg:top-4 lg:block lg:w-2/6' : ''}`}
          >
            <div className=" flex items-center">
              <p className=" text-fun2">
                R${uniqueProduct[0].produtos[colorIdProduct].tamanhos[0].valor}
              </p>
              <p>ou em até 12x</p>
            </div>
            <h1 className=" text-h3">{uniqueProduct[0].nome}</h1>
            <article className={`${isTopPageProduct ? ' lg:w-full' : ''}`}>
              <div
                className={` ${isTopPageProduct ? '  lg:flex lg:w-full' : ''} flex justify-center rounded-lg border border-cinza-100 py-2  lg:py-10`}
              >
                <img
                  className=" w-2/5 place-self-center"
                  src={uniqueProduct[0].produtos[colorIdProduct].fotos[0]}
                  alt="camiseta"
                />
              </div>
            </article>
          </section>

          <form className=" mt-8 space-y-8">
            <section className=" space-y-5 " aria-labelledby="select-color">
              <h2 className=" max-w-40 text-sub2" id="select-color">
                Selecione a{' '}
                <span className=" text-cinza-500">cor do produto</span>
              </h2>
              <div className="flex flex-wrap gap-4">
                {uniqueProduct[0].produtos.map((product, key) => (
                  <Square
                    key={product.cor + key}
                    isSelect={colorProduct === product.cor}
                    callBackClick={handleSelectedColorProduct}
                    value={product.cor}
                    label={product.cor}
                  >
                    <img src={product.fotos[0]} alt="Preto" />
                  </Square>
                ))}
              </div>
            </section>

            <section>
              <h2 className=" max-w-40 text-sub2">
                Que tal escolher os{' '}
                <span className=" text-cinza-500">tamanhos?</span>
              </h2>
              <div className=" flex flex-wrap gap-4">
                {sizes.map((size, index) => {
                  
                  // if (uniqueProduct[0].produtos)
                  return (
                    <Square
                      callBackClick={handleSelectedSizeProduct}
                      isSelect={sizeProduct === size.size}
                      key={size.size + index}
                      value={size.size}
                    >
                      <p>{size.size}</p>
                    </Square>
                  )
                })}
              </div>
            </section>

            <section className=" space-y-5" aria-labelledby="payment">
              <h2 className=" max-w-40 text-sub2" id="payment">
                Formas de pagamento
              </h2>
              <div className=" flex flex-wrap gap-4">
                <Square
                  callBackClick={handleSelectedMethodPayment}
                  isSelect={paymentMethod === 'pix'}
                  value="pix"
                  label="Pix"
                >
                  <PixLogo />
                </Square>
                <Square
                  callBackClick={handleSelectedMethodPayment}
                  isSelect={paymentMethod === 'cartão de crédito'}
                  value="cartão de crédito"
                  label="Cartão de crédito"
                >
                  <CardIcon />
                </Square>
                <Square
                  callBackClick={handleSelectedMethodPayment}
                  isSelect={paymentMethod === 'cartão de débito'}
                  value="cartão de débito"
                  label="Cartão de débito"
                >
                  <CardIcon />
                </Square>
                <Square
                  callBackClick={handleSelectedMethodPayment}
                  isSelect={paymentMethod === 'dinheiro'}
                  value="dinheiro"
                  label="Dinheiro"
                >
                  <MoneyIcon />
                </Square>
              </div>

              <div>
                {paymentMethod === 'dinheiro' && (
                  <>
                    <label className=" flex items-center">
                      Desejo troco
                      <input type="checkBox" />
                    </label>
                    <input type="text" />
                  </>
                )}
              </div>
            </section>

            <PrimaryButton
              action={() => Navigate('/carrinho')}
              size="medium"
              text="Adicionar ao carrinho"
            />
          </form>
        </>
      )}
    </main>
  )
}
