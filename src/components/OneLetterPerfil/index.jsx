export function OneLetterPerfil({ name, border }) {
  // Se nome for igual a null passará a ser 'Vazio' para não gerar erro
  const student = name ?? 'Vazio'
  // Retorna a primeira letra do nome
  const initial = student[0]

  return (
    <>
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cinza-200 px-4 py-1 text-cinza-300 hover:bg-cinza-200 hover:text-branco ">
        <p className=" text-fun2 ">{initial}</p>
      </div>
    </>
  )
}
