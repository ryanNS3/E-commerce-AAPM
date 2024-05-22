import React from 'react'
import { IlustrationPerson } from '../assets/ilustrationHeader'
import { PrimaryButton } from '../components/buttons/primaryButton'
import { Search } from '../components/search'

export function Home() {
  return (
    <>
      <header className=" grid lg:grid-cols-2">
        <section className="flex flex-col gap-4">
          <h1 className="max-w-[550px] text-h3">
            Contríbua para a melhora do escola.
          </h1>
          <p className=" text-ct2">
            Assine ou compre algum produto da AAPM e faça parte do nosso time
          </p>

          <div className=" flex items-center gap-4  ">
            <PrimaryButton text="Assine agora" size="small" />
            <p className=" text-fun2">Ou</p>
            <PrimaryButton text="Compre agora" size="small" />
          </div>
        </section>

        <section className=" justify-self-end">
          <IlustrationPerson />
        </section>
      </header>

      <main aria-labelledby="produto">
        <header className="flex justify-between">
          <h1 className="text-h4 uppercase" id="produto">
            Nossos Produtos
          </h1>
          <Search />
        </header>
        <nav></nav>
        <div></div>
      </main>
    </>
  )
}
