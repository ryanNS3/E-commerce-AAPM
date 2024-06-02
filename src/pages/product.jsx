import { Square } from '../components/square'
import camiseta from '../assets/fotoTesteCamiseta.png'
export function Product({ productData }) {
  return (
    <main className=" grid">
      <section>
        <div className=" flex items-center">
          <p className=" text-fun2">R$900</p>
          <p>ou em até 12x</p>
        </div>
        <h1 className=" text-h3">Camiseta</h1>
        <article>
          <div className=" flex justify-center rounded-lg border  border-cinza-100">
            <img className=" w-2/5" src={camiseta} alt='camiseta' />
          </div>
        </article>
      </section>

      <section>
        <h2 className=''>Selecione uma cor</h2>
        <label>
          <Square />
          <Square />
          <Square />
        </label>
      </section>
    </main>
  )
}
