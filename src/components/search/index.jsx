import React from 'react'

import { SearchIcon } from '../../assets/search'

export function Search({ valueForSearchProdut, onChange }) {
  const [isEnableInputSearch, setIsEnableInputSearch] = React.useState(false)
  const stylesDisableInput = ' w-0 opacity-0'
  const stylesEnableInput = 'w-full opacity-1 border border-rosa-300'
  const styleInput = isEnableInputSearch
    ? stylesEnableInput
    : stylesDisableInput

  function handleSearch(event) {
    event.preventDefault()
    setIsEnableInputSearch((prevEnable) => !prevEnable)
  }

  return (
    <div className="flex">
      <input
        className={`${styleInput} duration-100`}
        value={valueForSearchProdut}
        onChange={onChange}
      />
      <button onClick={handleSearch}>
        {isEnableInputSearch ? <p>X</p> : <SearchIcon />}
      </button>
    </div>
  )
}
