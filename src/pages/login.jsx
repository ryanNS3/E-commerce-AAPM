import React from 'react'

import { IlustrationNotebook } from '../assets/ilustration/ilustrationNotebook'
import { PrimaryButton } from '../components/buttons/primaryButton/index'
import { InputText } from '../components/inputs/inputText'
import { Label } from '../components/label/index'
import { emailSchema, passwordSchema } from '../utils/zodValidate'
import { UserGlobal } from '../Contexts/userContext'

export function Login() {
  const { mutateUserLogin } = React.useContext(UserGlobal)
  const [emailUser, setEmailUser] = React.useState('')
  const [passwordUser, setPasswordUser] = React.useState('')
  const [isActiveButton, setIsActiveButton] = React.useState(false)
  const [errorValidate, setErrorValidate] = React.useState({
    email: null,
    password: null,
  })

  function handleSubmitLoginModal(event) {
    event.preventDefault()
    const dataUserLogin = {
      email: emailUser,
      senha: passwordUser,
    }
    try {
      // validação
      setIsActiveButton(true)
      // loginSchema.parse({
      //   email: emailUser,
      //   password: passwordUser,
      // })
      // função de requisição
      mutateUserLogin.mutate(dataUserLogin)
    } catch (error) {
      error.errors.forEach((err) => {
        if (err.path?.join() === 'email') {
          setErrorValidate((prevState) => ({
            ...prevState,
            email: err.message,
          }))
        } else if (err.path?.join() === 'password') {
          setErrorValidate((prevState) => ({
            ...prevState,
            password: err.message,
          }))
        }
      })
    } finally {
      setIsActiveButton(false)
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
    }
  }
  React.useEffect(() => {
    if (
      errorValidate.email ||
      errorValidate.password ||
      !emailUser ||
      !passwordUser
    ) {
      setIsActiveButton(true)
    } else {
      setIsActiveButton(false)
    }
  }, [errorValidate, emailUser, passwordUser])

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
