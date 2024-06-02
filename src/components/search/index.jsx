import React from 'react'
import { SearchIcon } from '../../assets/search'

export function Search({ valueForSearchProdut, onChange }) {
  const [isInputFocused, setIsInputFocused] = React.useState(false)

  function handleFocus() {
    setIsInputFocused(true)
  }

  function handleBlur() {
    setIsInputFocused(false)
  }

  return (
    <label
      className={`flex items-center w-full gap-2 rounded-2xl border-2 p-4 duration-100 ${isInputFocused ? 'border-rosa-300' : 'border-cinza-100'} group-hover:border-rosa-300`}
    >
      <SearchIcon />
      <input
        className="w-full outline-none" // Adicione outline-none para remover a borda padrão do input
        value={valueForSearchProdut}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder='Pesquisar'
      />
    </label>
  )
}
