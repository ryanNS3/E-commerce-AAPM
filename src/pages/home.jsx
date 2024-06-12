import React from 'react'
import donate from '../assets/imgsHome/donate.png'
import student from '../assets/imgsHome/student.png'
import pencil from '../assets/imgsHome/pencil.png'
import { IlustrationPerson } from '../assets/ilustrationHeader'
import { PrimaryButton } from '../components/buttons/primaryButton'
import { Search } from '../components/search'
import { CardProduct } from '../components/cards/cardProduct'
import { useNavigate } from 'react-router-dom'
import { productContext } from '../Contexts/productContext'

export function Home() {
  const navigate = useNavigate()
  const { groupProduct } = React.useContext(productContext)
  console.log(groupProduct)

  function handleClickVisualizationProduct(event, productSelected) {
    navigate(`/produto/${productSelected}`)
  }

  return (
    <div className=" space-y-20">
      <header className=" grid items-center justify-center pt-7 md:items-start md:justify-normal md:pt-0  lg:grid-cols-2">
        <section className="flex  flex-col items-center justify-center gap-4 md:items-start md:justify-start">
          <h1 className="max-w-[550px] text-center text-h5 md:text-start md:text-h3 xl:max-w-[750px] xl:text-h2">
            Contríbua para a melhora do escola.
          </h1>
          <p className=" text-center text-ct2 md:text-start">
            Assine ou compre algum produto da AAPM e faça parte do nosso time
          </p>

          <div className=" flex items-center gap-4  ">
            <PrimaryButton text="Assine agora" size="small" />
            <p className=" text-fun2">Ou</p>
            <a href={'#produtos'}>
              <PrimaryButton text="Compre agora" size="small" />
            </a>
          </div>
        </section>

        <section className=" justify-self-center  sm:w-2/3 md:justify-self-end">
          <IlustrationPerson />
        </section>
      </header>

      <main className=" space-y-8 " id="produto" aria-labelledby="produto">
        <header className="flex flex-col">
          <h1 className="mb-8 text-h4 uppercase">Nossos Produtos</h1>
          <Search />
        </header>
        <section
          className="flex max-w-full gap-6  overflow-x-scroll py-2"
          id="produtos"
        >
          {groupProduct &&
            groupProduct.map((products, index) => (
              <CardProduct
                name={products.nome + index}
                key={products.nome}
                price={products.valor}
                photo={products.produtos[0].fotos}
                onCLick={(e) =>
                  handleClickVisualizationProduct(e, products.nome)
                }
              />
            ))}
        </section>
      </main>

      <article className=" grid gap-4 md:grid-cols-2">
        <div className="grid w-full grid-cols-2 gap-4">
          <div className="flex h-full flex-col gap-4">
            <img
              className="h-full w-full"
              src={donate}
              alt="várias mãos juntas com um coração pintado de vermelho ao meio"
            />
            <img
              className=" h-full w-full"
              src={pencil}
              alt="lápis de escrever"
            />
          </div>
          <img className="h-full w-full" src={student} alt="aluno segurando " />
        </div>
        <section className=" row-start-1 flex  flex-col items-end lg:col-start-2 lg:max-w-96 lg:justify-self-end">
          <h1 className=" text-h4">Sobre nós</h1>
          <p className=" text-end">
            A APM é uma instituição auxiliar da escola, com objetivos sociais e
            educativos, que não tem caráter político, racial ou religioso e nem
            finalidades lucrativas. A sua finalidade é colaborar no
            aprimoramento do processo educacional, na assistência ao escolar e
            na integração família-escola-comunidade.
          </p>
        </section>
      </article>
    </div>
  )
}
