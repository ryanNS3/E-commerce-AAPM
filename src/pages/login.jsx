import React from 'react'

import { IlustrationNotebook } from '../assets/ilustration/ilustrationNotebook'
import { PrimaryButton } from '../components/buttons/primaryButton/index'
import { InputText } from '../components/inputs/inputText'
import { Label } from '../components/label/index'
import { emailSchema, loginSchema, passwordSchema } from '../utils/zodValidate'

export function Login() {
  const [emailUser, setEmailUser] = React.useState('')
  const [passwordUser, setPasswordUser] = React.useState('')
  const [isActiveButton, setIsActiveButton] = React.useState(true)
  const [errorValidate, setErrorValidate] = React.useState({
    email: null,
    password: null,
  })

  React.useEffect(() => {
    if (
      errorValidate.email ||
      errorValidate.password ||
      emailUser == '' ||
      passwordUser == ''
    ) {
      setIsActiveButton(true)
    } else {
      setIsActiveButton(false)
    }
  }, [errorValidate, emailUser, passwordUser])

  function handleSubmitLoginModal(event) {
    event.preventDefault()
    try {
      loginSchema.parse({
        email: emailUser,
        password: passwordUser,
      })
    } catch (error) {
      error.errors.forEach((err) => {
        if (error.path === 'email') {
          setErrorValidate((prevState) => ({
            ...prevState,
            email: err.message,
          }))
        } else {
          setErrorValidate((prevState) => ({
            ...prevState,
            password: err.message,
          }))
        }
      })
      console.log(error.errors)
    }
  }

  function handleChangeEmailLogin({ target }) {
    setEmailUser(target.value)
    try {
      emailSchema.parse(target.value)
      setErrorValidate((prevState) => ({ ...prevState, email: null }))
    } catch (error) {
      const message = error.errors[1]
        ? error.errors[1].message
        : error.errors[0].message
      setErrorValidate((prevState) => ({ ...prevState, email: message }))
      console.log(message)
    }
  }

  function handleChangePasswordLogin({ target }) {
    setPasswordUser(target.value)
    try {
      passwordSchema.parse(target.value)
      setErrorValidate((prevState) => ({ ...prevState, password: null }))
    } catch (error) {
      const message = error.errors[1]
        ? error.errors[1].message
        : error.errors[0].message
      setErrorValidate((prevState) => ({ ...prevState, password: message }))
      console.log(message)
    }
  }

  return (
    <div className=" py-4 md:grid md:grid-cols-2   ">
      <section className=" hidden w-full items-center justify-center md:flex ">
        <IlustrationNotebook />
      </section>

      <form
        className=" flex flex-col space-y-11"
        onSubmit={handleSubmitLoginModal}
      >
        <h4 className="  text-h5">Login</h4>
        <div className=" space-y-4">
          <div>
            <Label htmlFor="emailLogin" marginButtom={'4'}>
              Email
            </Label>
            <InputText
              id="emailLogin"
              value={emailUser}
              onChange={handleChangeEmailLogin}
              error={errorValidate.email}
            />
          </div>
          <div>
            <Label htmlFor="passwordLogin" marginButtom={'4'}>
              Senha
            </Label>
            <InputText
              value={passwordUser}
              onChange={handleChangePasswordLogin}
              id="passwordLogin"
              error={errorValidate.password}
            />
          </div>
        </div>
        <PrimaryButton disabled={isActiveButton} text="Confirmar" />
      </form>
    </div>
  )
}
