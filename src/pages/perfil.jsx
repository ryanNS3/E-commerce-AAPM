import React from 'react'
import { UserGlobal } from '../Contexts/userContext'

export function Perfil() {
  const { dataPerfilUser } = React.useContext(UserGlobal)
  console.log(dataPerfilUser)
  return (
    <main>
      <p>aaa</p>
    </main>
  )
}
