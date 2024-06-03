import React from 'react'
import camiseta from '../assets/fotoTesteCamiseta.png'

export function Cart() {
  return (
    <main className=" flex flex-col">
      <header aria-labelledby="carrinho">
        <h1 className=" text-h3 " id="carrinho">
          Carrinho
        </h1>
      </header>
      <section className="">
        <article className=" sm:flex sm:items-start md:items-center justify-between rounded-lg border-2 border-cinza-100 p-8">
          <div className=" sm:flex sm:justify-between gap-8">
            <div className=" min-w-16 max-w-24 ">
              <img className="w-full" src={camiseta} alt="" />
            </div>

            <div className=" flex flex-col  justify-between">
              <div className=" flex flex-col gap-2">
                <h2 className=" text-sub1">Camiseta Branca</h2>
                <p className=" text-fun2">R$33,90</p>
              </div>

              <div className=" flex flex-col">
                <p>Tamanho</p>
                <div className=" place-self-start rounded-lg bg-preto px-4 py-1 text-branco">
                  P
                </div>
              </div>
            </div>
          </div>

          <select className=" focus:border-cinza-100 active:border-cinza-100">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>

          <button className=" rounded-lg p-2 text-ct3 text-rosa-300 hover:bg-rosa-300 hover:text-branco">
            Remover
          </button>
        </article>
      </section>
    </main>
  )
}
