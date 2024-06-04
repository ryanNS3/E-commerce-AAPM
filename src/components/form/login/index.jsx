import React from 'react'

import { IlustrationNotebook } from '../../../assets/ilustration/ilustrationNotebook'
import { PrimaryButton } from '../../buttons/primaryButton'
import { InputText } from '../../inputs/inputText'
import { Label } from '../../label'

export function LoginForm() {
  const [emailUser, setEmailUser] = React.useState('')
  const [passwordUser, setPasswordUser] = React.useState('')

  function handleSubmitLoginModal(event) {
    event.preventDefault()
  }

  return (
    <div className=" md:grid md:grid-cols-2  ">
      <section className=" flex hidden w-full items-center justify-center md:flex ">
        <IlustrationNotebook />
      </section>

      <form
        className=" flex flex-col space-y-11"
        onSubmit={handleSubmitLoginModal}
      >
        <h4 className="  text-h5">Login</h4>
        <div className="">
          <Label htmlFor="emailLogin" marginButtom={'4'}>
            Email
          </Label>
          <InputText
            value={emailUser}
            onChange={({ target }) => setEmailUser(target.value)}
            id="emailLogin"
          />
          <Label htmlFor="passwordLogin" marginButtom={'4'}>
            Senha
          </Label>
          <InputText
            value={passwordUser}
            onChange={({ target }) => setPasswordUser(target.value)}
            id="passwordLogin"
          />
        </div>
        <PrimaryButton text="Confirmar" />
      </form>
    </div>
  )
}
