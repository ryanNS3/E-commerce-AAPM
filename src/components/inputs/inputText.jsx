import { LabelError } from '../label/labelError'

export function InputText({
  id,
  name,
  value,
  onChange,
  disabled,
  error,
  ...props
}) {
  return (
    <div className=" flex w-full flex-col">
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`appearance-none border-2 ${disabled ? 'bg-cinza-100' : 'bg-cinza-50'} ${error ? 'border-vermelho-300' : 'border-cinza-100'} focus:shadow-outline w-full rounded-lg px-3 py-4 pr-10 text-fun2 leading-tight text-cinza-500 focus:border-rosa-destaque focus:outline-none`}
        disabled={disabled}
        {...props}
      />
      {error && <LabelError error={error} />}
    </div>
  )
}
