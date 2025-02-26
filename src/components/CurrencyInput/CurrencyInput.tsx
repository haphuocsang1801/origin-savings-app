import { checkValidCurrency, formatCurrency, formatDisplayValue, parseCurrencyInput } from '@/utils/currency'
import classNames from 'classnames'
import React, { ChangeEvent, useState } from 'react'
import CurrencyIcon from '../icons/CurrencyIcon'
type CurrencyInputProps = {
  value: number
  onChangeCurrencyInput: (value: number) => void
  name?: string
} & React.InputHTMLAttributes<HTMLInputElement>
const CurrencyInput = ({ value, onChangeCurrencyInput, name = 'amount', ...props }: CurrencyInputProps) => {
  const [displayValue, setDisplayValue] = useState<string>('')
  const [error, setError] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const isValid = checkValidCurrency(rawValue)
    if (isValid) {
      const parsedValue = parseCurrencyInput(rawValue)
      setDisplayValue(rawValue)
      onChangeCurrencyInput(parsedValue)
      setError(false)
    } else {
      setError(true)
    }
  }

  const handleBlur = () => {
    if (value) {
      setDisplayValue(
        formatDisplayValue(
          formatCurrency(value, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        )
      )
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='relative w-full'>
        <div className='absolute -translate-y-1/2 left-4 top-1/2'>
          <CurrencyIcon />
        </div>
        <input
          data-testid='currency-input'
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
          className={classNames(
            'input-primary pl-[44px] pr-4 text-xl md:text-2xl font-medium text-blueGray600 font-rubik',
            {
              'border-red-500': error,
              'border-blueGray50 focus-within:border-brandColorSecondary': !error
            }
          )}
        />
      </div>
      {error && (
        <p className='text-sm text-red-500' data-testid='currency-error-message'>
          Please enter a valid amount
        </p>
      )}
    </div>
  )
}

export default CurrencyInput
