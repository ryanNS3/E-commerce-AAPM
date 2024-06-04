export function Label({ children, htmlFor, marginButtom, marginTop }) {
  return (
    <label
      className={`text-fun2 mt-${marginTop} mb-${marginButtom}`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}
