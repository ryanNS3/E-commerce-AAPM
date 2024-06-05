import React from 'react'
import camiseta from '../assets/fotoTesteCamiseta.png'
import { PrimaryButton } from '../components/buttons/primaryButton'
import { useNavigate } from 'react-router-dom'

export function Cart() {
  const Navigation = useNavigate()
  return (
    <main className=" flex flex-col">
      <header
        className=" flex items-center justify-between"
        aria-labelledby="carrinho"
      >
        <h1 className=" text-h5 md:text-h3 " id="carrinho">
          Carrinho
        </h1>
        <div className=" flex justify-end">
          <PrimaryButton
            action={() => Navigation('/agendamento')}
            text="Finalizar agendamento"
          />
        </div>
      </header>
      <section className="">
        <article className=" justify-between rounded-lg border-2 border-cinza-100 p-8 sm:flex sm:items-start md:items-center">
          <div className=" gap-8 sm:flex sm:justify-between">
            <div className=" min-w-16 max-w-24 ">
              <img className="w-full" src={camiseta} alt="" />
            </div>

            <div className=" flex flex-col  justify-between">
              <div className=" flex flex-col gap-2">
                <h2 className=" text-sub1">Camiseta Branca</h2>
                <p className=" text-fun2">R$33,90</p>
              </div>
            </div>
          </div>

          <select className=" focus:border-cinza-100 active:border-cinza-100">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>

          <button className=" rounded-lg p-2 text-ct3 text-rosa-300 hover:bg-rosa-300 hover:text-branco">
            Remover
          </button>
        </article>
      </section>
    </main>
  )
}
