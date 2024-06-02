import fotoCamiseta from '../../../assets/fotoTesteCamiseta.png'

export function CardProduct({ name, photo, price, onCLick }) {
  return (
    <article
      onClick={onCLick}
      className=" flex h-78 max-w-72 flex-col gap-4 rounded-2xl border border-cinza-100 px-7 py-9 duration-600 hover:border-transparent  hover:shadow-card-e-nexus "
    >
      <div className="flex w-2/3 place-self-center">
        <img className=" max-w-full" src={fotoCamiseta} alt="" />
      </div>
      <div>
        <p className=" text-sub1">{name}</p>
        <p className=" text-sub2">{price}</p>
      </div>
    </article>
  )
}
