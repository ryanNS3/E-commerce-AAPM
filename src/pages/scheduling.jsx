import React, { useState } from 'react'
import { Stepper } from '../components/stepper/Stepper'
import { Square, SquareFillMode } from '../components/square'
import { InputCalendar } from '../components/inputs/inputCalendar'
import { Label } from '../components/label'
import { PrimaryButton } from '../components/buttons/primaryButton'
import { LabelError } from '../components/label/labelError'
import { cartContext } from '../Contexts/cartContext'
import { useNavigate } from 'react-router-dom'
import { PixLogo } from '../assets/icons/pix'
import { CardIcon } from '../assets/icons/card'
import { MoneyIcon } from '../assets/icons/money'
export function Scheduling() {
  const {
    productFilterWithoutValue,
    allProductsGroup,
    filterValue,
    mutatePostScheduling,
  } = React.useContext(cartContext)
  const Navigate = useNavigate()
  const [selectedTime, setSelectedTime] = useState(null)
  const [dateOfScheduling, setDateOfScheduling] = React.useState(null)
  const [paymentMethod, setPaymentMethod] = React.useState(null)
  const [errorValidate, setErrorValidate] = React.useState({
    product: null,
    date: null,
    hours: null,
  })

  console.log(productFilterWithoutValue)
  console.log(filterValue?.[0]?.[1])


  React.useEffect(() => {
    if (!allProductsGroup) {
      Navigate('/')
    }
  }, [])

  function handleSelectedMethodPayment(event) {
    event.preventDefault()
    const payment = event.target.dataset.value
    setPaymentMethod(payment)
  }
  // const [products, setProducts] = useState([
  //   {
  //     id: 1,
  //     name: 'Camiseta',
  //     price: 39.9,
  //     quantity: 1,
  //     imageUrl:
  //       'https://static.wixstatic.com/media/5b4f0d_a24990f48954407c94bf4044af5103c4~mv2.jpg/v1/fill/w_500,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5b4f0d_a24990f48954407c94bf4044af5103c4~mv2.jpg',
  //   },
  //   {
  //     id: 2,
  //     name: 'Camiseta',
  //     price: 39.9,
  //     quantity: 1,
  //     imageUrl:
  //       'https://static.wixstatic.com/media/5b4f0d_a24990f48954407c94bf4044af5103c4~mv2.jpg/v1/fill/w_500,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5b4f0d_a24990f48954407c94bf4044af5103c4~mv2.jpg',
  //   },
  //   {
  //     id: 3,
  //     name: 'Camiseta',
  //     price: 39.9,
  //     quantity: 1,
  //     imageUrl:
  //       'https://static.wixstatic.com/media/5b4f0d_a24990f48954407c94bf4044af5103c4~mv2.jpg/v1/fill/w_500,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5b4f0d_a24990f48954407c94bf4044af5103c4~mv2.jpg',
  //   },
  // ])
  // efetuando as restrições de data
  const today = new Date()
  const maxDate = new Date(today)
  // disponibilizando datas no limte de 7 dias após a data atual
  maxDate.setDate(maxDate.getDate() + 5)

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  // data mínima
  const todayStr = formatDate(today)
  // data máxima
  const maxDateStr = formatDate(maxDate)

  function handleChangeDateScheduling(event) {
    const selectedDate = event.target.value
    if (selectedDate >= todayStr && selectedDate <= maxDateStr) {
      setDateOfScheduling(selectedDate)
      setErrorValidate((prevState) => ({ ...prevState, date: null }))
    } else {
      setErrorValidate((prevState) => ({
        ...prevState,
        date: `selecione apenas datas com no máximo 7 dias após  ${todayStr} `,
      }))
    }
  }

  // const updateQuantity = (productId, newQuantity) => {
  //   setProducts((prevProducts) => {
  //     return prevProducts.map((product) => {
  //       if (product.id === productId) {
  //         return { ...product, quantity: newQuantity }
  //       }
  //       return product
  //     })
  //   })
  // }

  // const removeProduct = (productId) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.filter((product) => product.id !== productId),
  //   )
  // }

  const handleTimeSelection = (event, time) => {
    event.preventDefault()
    setSelectedTime(time === selectedTime ? null : time)
  }

  function handleSubmitSchedulingBuy(event) {
    event.preventDefault()
    if (!errorValidate.date && !errorValidate.hours && !errorValidate.product) {
      if (!selectedTime || !dateOfScheduling) {
        console.log('teste')
      }

      setErrorValidate({
        date: null,
        hours: null,
        product: null,
      })

      mutatePostScheduling.mutate({
        tipoPagamento: paymentMethod,
        data: dateOfScheduling,
        virandoSocio: false,
      })
    }
  }

  return (
    <main
      aria-labelledby="schedulingBuy"
      className="grid justify-center gap-8 lg:grid-cols-2"
    >
      <section className=" space-y-6">
        <p>
          Tela inicial{' > '}Camiseta{' > '}Agendamento
        </p>
        <h1 className=" text-h5">Total: R${ }</h1>
        <ul className=" ">
          {productFilterWithoutValue?.map((product) => (
            <li
              className=" mb-4 flex h-[119px] w-full items-center  justify-start rounded border border-cinza-100 bg-cinza-50"
              key={product[1].idProduto}
            >
              <div className=" flex items-center justify-start">
                <img
                  className="h-[84.73px] w-[83px]"
                  src={product[1].foto}
                  alt={product[1].nome}
                />
                <p className=" text-center">{product[1].nome}</p>
              </div>
              {/* <Stepper
                min={1}
                max={10}
                step={1}
                initial={product.quantity}
                // onChange={(newQuantity) =>
                //   // updateQuantity(product.id, newQuantity)
                // }
              /> */}
              {/* <button
                className="text-purple-500 border-none bg-transparent hover:cursor-pointer"
                // onClick={() => removeProduct(product.id)}
              >
                Remover
              </button> */}
            </li>
          ))}
        </ul>
      </section>

      <form className="" onSubmit={handleSubmitSchedulingBuy}>
        <h1 className=" mb-8 mt-8 max-w-60 text-h5" id="schedulingBuy">
          Agendamento da compra
        </h1>
        <Label htmlFor="dateForScheduling">Data de agendamento</Label>
        <InputCalendar
          id="dateForScheduling"
          value={dateOfScheduling}
          onChange={handleChangeDateScheduling}
          minDateValidation={todayStr}
          maxDateValidate={maxDateStr}
          error={errorValidate.date}
        />
        <h2 id="availableTimesScheduling" className=" mt-6 text-sub2">
          Horários dísponíveis:
        </h2>
        <section aria-labelledby="availableTimesScheduling">
          <ul className="mb-4 flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((time) => (
              <li key={time}>
                <SquareFillMode
                  isSelect={selectedTime === time}
                  callBackClick={(event) => handleTimeSelection(event, time)}
                >
                  {time}:00
                </SquareFillMode>
              </li>
            ))}
          </ul>
          {errorValidate.hours && <LabelError error={errorValidate.hours} />}
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

        <PrimaryButton text="Finalizar agendamento" />
      </form>
    </main>
  )
}
