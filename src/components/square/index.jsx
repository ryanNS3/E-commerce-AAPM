export function Square({
  value,
  disabled,
  callBackClick,
  label,
  isSelect,
  children,
}) {
  return (
    <div className=" flex flex-col items-center">
      <button
        data-value={value}
        aria-labelledby={`label-square-${label}`}
        onClick={callBackClick}
        className={`flex  size-18 items-center justify-center rounded-lg border border-cinza-100 bg-cinza-50 p-2  md:border-2 xl:border-[3px] 
        ${isSelect && 'border-rosa-300'}
        ${disabled && 'bg-cinza-100'} hover:border-rosa-300`}
      >
        <div className=" pointer-events-none">{children}</div>
      </button>
      <p
        className=" max-w-20 text-center text-ct2"
        id={`label-square-${label}`}
      >
        {label}
      </p>
    </div>
  )
}
export function SquareFillMode({
  value,
  disabled,
  callBackClick,
  label,
  isSelect,
  children,
}) {
  return (
    <div className=" flex flex-col items-center">
      <button
        data-value={value}
        aria-labelledby={`label-square-${label}`}
        onClick={callBackClick}
        className={`flex  size-18 items-center justify-center rounded-lg border border-cinza-100 bg-cinza-50 p-2  md:border-2 xl:border-[3px] ${isSelect && ' bg-rosa-300 text-branco'} hover:border-rosa-300`}
      >
        <div className=" pointer-events-none">{children}</div>
      </button>
      <p
        className=" max-w-20 text-center text-ct2"
        id={`label-square-${label}`}
      >
        {label}
      </p>
    </div>
  )
}
