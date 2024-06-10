import React, { useContext, useState, useEffect } from 'react'
import { toastifyContext } from '../Contexts/toastifyContext'
import { EmployeeContext } from '../../context/Employee'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { PinkButton } from '../../components/Buttons/pinkButton'
import { InputText } from '../../components/Inputs/input-text/inputTextComp'


function validatePasswords(password, confirmPassword) {
  const passwordValidation = passwordSchema.safeParse(password)
  if (!passwordValidation.success) {
    return passwordValidation.error.errors[0].message
  }
  if (password !== confirmPassword) {
    return 'As senhas não coincidem.'
  }
  return null
}
export function ResetPassword() {
  const { ResetPassword } = useContext(EmployeeContext)
  const { Notification } = useContext(toastifyContext)
  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [inputError, setInputError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    setInputError(false)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
    setInputError(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationError = validatePasswords(password, confirmPassword)
    if (validationError) {
      setErrorMessage(validationError)
      setInputError(true)
      return
    }

    setLoading(true)
    try {
      const success = await ResetPassword(token, password)

      if (!success) {
        throw new Error('Erro ao redefinir a senha.')
      }

      Notification('sucess', 'Senha Atualizada com sucesso')
      setLoading(false)
      navigate('/login')
    } catch (error) {
      setLoading(false)
      setErrorMessage(
        error.message ||
          'Erro durante a redefinição da senha. Por favor, tente novamente.',
      )
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-preto md:h-screen md:flex-row">
      <div className="flex min-h-screen w-full flex-col justify-start bg-preto pl-10">
        <h1 className="pt-20 text-h5 text-cinza-50">Definir Nova Senha</h1>
        <p className="text-cp2 w-3/4 pt-6 text-cinza-50">
          Por favor, insira sua nova senha nos campos designados.
        </p>
      </div>

      <div className="mt-12 flex min-h-screen w-full flex-col items-center justify-center rounded-t-[16px] bg-cinza-50 pl-6 pt-10 md:mt-0 md:items-start md:rounded-l-[16px] md:pl-12 md:pt-0">
        <h3 className="mb-8 text-h3">Nova Senha</h3>
        <form
          onSubmit={handleSubmit}
          className="flex w-3/4 flex-col gap-4"
          noValidate
        >
          <InputText
            id="password"
            type="password"
            name="Senha"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Nova Senha"
            required={true}
            disabled={loading}
            error={inputError}
          />
          <InputText
            id="confirm-password"
            type="password"
            name="Confirmar senha"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirmar Senha"
            required={true}
            disabled={loading}
            error={inputError}
          />
          {errorMessage && (
            <p className="text-fun2 text-vermelho-300">{errorMessage}</p>
          )}
          <Link to="/login" className="mt-4 text-start text-fun2 text-rosa-400">
            Voltar para Login
          </Link>
          <PinkButton
            text="Redefinir Senha"
            size="medium"
            align="end"
            loading={loading}
          />
        </form>
      </div>
    </div>
  )
}
