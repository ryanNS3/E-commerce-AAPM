import React from 'react'

export function PrimaryButton({
  text,
  size,
  action,
  align,
  loading,
  disabled,
  type,
  icon,
  typeButton,
  ...props
}) {
  // Definir o tamanho do botão

  // Definir o posicionamento do botão
  let alignment = ''
  switch (align) {
    case 'start':
      alignment = 'start'
      break
    case 'end':
      alignment = 'end'
      break
    case 'center':
      alignment = 'center'
      break
    case 'stretch':
      alignment = 'stretch'
      break
    case 'baseline':
      alignment = 'baseline'
      break
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      alignment = 'auto'
  }

  let buttonColour = ''
  switch (type) {
    case 'secondary':
      buttonColour = 'bg-gradient-to-r from-[#494747] to-[#1A1A1A]'
      break

    default:
      buttonColour = 'bg-gradient-to-r from-[#BD3FD1] to-[#9332AE]'
  }

  return (
    <button
      type={typeButton || 'submit'}
      onClick={action}
      className={`flex items-center justify-center ${disabled || loading ? (type === 'secondary' ? 'bg-cinza-100 text-cinza-950' : 'bg-rosa-50 text-rosa-400') : buttonColour} focus:shadow-outline transform rounded-[4px] px-7 py-3 text-fun2 text-cinza-50 transition duration-300 hover:scale-105 focus:outline-none active:scale-100`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <svg
          aria-hidden="true"
          className="text-gray-200 h-8 w-8 animate-spin fill-roxo-200"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      ) : (
        <div className="flex gap-2">
          {icon}
          <span className="self-end uppercase">{text}</span>
        </div>
      )}
    </button>
  )
}
