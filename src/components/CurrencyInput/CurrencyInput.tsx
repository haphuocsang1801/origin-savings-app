import React, { useState, useEffect, ChangeEvent } from 'react'
import { formatCurrency, parseCurrencyInput } from '@/utils/currency'
import { MIN_AMOUNT, MAX_AMOUNT } from '@/utils/constants'
import { validateAmount } from '@/utils/calculations'
import CurrencyIcon from '../icons/CurrencyIcon'
type CurrencyInputProps = {
  value: number
  onChangeCurrencyInput: (value: number) => void
  name?: string
} & React.InputHTMLAttributes<HTMLInputElement>
const CurrencyInput = ({ value, onChangeCurrencyInput, name = 'amount', ...props }: CurrencyInputProps) => {
  const [displayValue, setDisplayValue] = useState<string>('')
  const [isFocused, setIsFocused] = useState<boolean>(false)

  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatCurrency(value))
    }
  }, [value, isFocused])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const parsedValue = parseCurrencyInput(rawValue)

    if (validateAmount(parsedValue)) {
      setDisplayValue(rawValue)
      onChangeCurrencyInput(parsedValue)
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    setDisplayValue(
      formatCurrency(value, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    )
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    e.target.select()
  }

  return (
    <div className='relative w-full'>
      <div className='absolute -translate-y-1/2 left-4 top-1/2'>
        <CurrencyIcon />
      </div>
      <input
        {...props}
        name={name}
        type='text'
        id={name}
        inputMode='decimal'
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder='0.00'
        min={MIN_AMOUNT}
        max={MAX_AMOUNT}
        className='w-full pl-[44px] pr-4 text-xl md:text-2xl font-medium border rounded-[4px] outline-none font-rubik text-blueGray600 border-blueGray50 h-14 focus:border-brandColorPrimary focus:ring-1 focus:ring-priborder-brandColorPrimary'
      />
    </div>
  )
}

export default CurrencyInput
