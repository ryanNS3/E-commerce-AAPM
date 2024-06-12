import React from 'react'
import { IlustrationNotebook } from '../assets/ilustration/ilustrationNotebook'
import { PrimaryButton } from '../components/buttons/primaryButton/index'
import { InputText } from '../components/inputs/inputText'
import { Label } from '../components/label/index'
import { emailSchema, passwordSchema } from '../utils/zodValidate'
import { UserGlobal } from '../Contexts/userContext'

export function ResetPassword() {
  const { userResetPasswordMutate } = React.useContext(UserGlobal)
  const [emailUser, setEmailUser] = React.useState('')
  const [isActiveButton, setIsActiveButton] = React.useState(true)
  const [errorValidate, setErrorValidate] = React.useState({
    email: null,
  })

  function handleSubmitLoginModal(event) {
    event.preventDefault()
    setIsActiveButton(true)
    const dataUserLogin = {
      email: emailUser,
    }
    try {
      // validação
      // loginSchema.parse({
      //   email: emailUser,
      //   password: passwordUser,
      // })
      // função de requisição
      userResetPasswordMutate.mutate(dataUserLogin)
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

  React.useEffect(() => {
    if (errorValidate.email || !emailUser) {
      setIsActiveButton(true)
    } else {
      setIsActiveButton(false)
    }
  }, [errorValidate, emailUser])

  return (
    <div className=" py-4 md:grid md:grid-cols-2   ">
      <section className=" hidden w-full items-center justify-center md:flex ">
        <IlustrationNotebook />
      </section>

      <form
        className=" flex flex-col space-y-11"
        onSubmit={handleSubmitLoginModal}
      >
        <h4 className="  text-h5">Restaurar senha</h4>
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
        </div>
        <PrimaryButton disabled={isActiveButton} text="Confirmar" />
      </form>
    </div>
  )
}
