// Stepper.js
import React, { useState } from 'react'

export function Stepper({
  min = 1,
  max = 10,
  step = 1,
  initial = 1,
  onChange,
}) {
  const [value, setValue] = useState(initial)

  const handleIncrement = () => {
    const newValue = Math.min(value + step, max)
    setValue(newValue)
    onChange(newValue)
  }

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min)
    setValue(newValue)
    onChange(newValue)
  }

  const handleChange = (e) => {
    const newValue = Number(e.target.value)
    if (newValue >= min && newValue <= max) {
      setValue(newValue)
      onChange(newValue)
    }
  }

  return (
    <div className="flex items-center">
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        className="text-lg bg-gray-200 border-gray-300 flex h-8 w-8 items-center justify-center rounded-full border disabled:opacity-50"
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        className="text-lg mx-2 w-12 border-none bg-transparent text-center focus:outline-none"
      />
      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className="text-lg bg-gray-200 border-gray-300 flex h-8 w-8 items-center justify-center rounded-full border disabled:opacity-50"
      >
        +
      </button>
    </div>
  )
}
