import { LabelError } from "../label/labelError";

export function InputCalendar({
  value,
  id,
  onChange,
  minDateValidation,
  maxDateValidate,
  error,
}) {
  return (
    <>
      <input
        type="date"
        value={value}
        onChange={onChange}
        id={id}
        className="flex h-fit w-full resize-none items-center rounded-lg border-2 border-cinza-100 px-5 py-4 text-ct3 uppercase focus:border-rosa-destaque focus:outline-none disabled:bg-cinza-100"
        min={minDateValidation}
        max={maxDateValidate}
      />
      {error && <LabelError error={error}/>}
    
    </>
  )
}
