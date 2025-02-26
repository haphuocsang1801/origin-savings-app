import { render, screen, fireEvent } from '@testing-library/react'
import * as currencyUtils from '@/utils/currency'
import CurrencyInput from '../CurrencyInput'

// Mock the currency utility functions
jest.mock('@/utils/currency', () => ({
  checkValidCurrency: jest.fn(),
  formatCurrency: jest.fn(),
  formatDisplayValue: jest.fn(),
  parseCurrencyInput: jest.fn()
}))

describe('CurrencyInput', () => {
  const mockOnChangeCurrencyInput = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    // Default mocks
    ;(currencyUtils.checkValidCurrency as jest.Mock).mockReturnValue(true)
    ;(currencyUtils.parseCurrencyInput as jest.Mock).mockReturnValue(1000)
    ;(currencyUtils.formatCurrency as jest.Mock).mockReturnValue('1,000.00')
    ;(currencyUtils.formatDisplayValue as jest.Mock).mockReturnValue('1,000')
  })

  test('renders correctly with default props', () => {
    render(<CurrencyInput value={0} onChangeCurrencyInput={mockOnChangeCurrencyInput} />)

    const inputElement = screen.getByTestId('currency-input')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('name', 'amount')
    expect(inputElement).toHaveAttribute('placeholder', '0.00')
  })

  test('renders with custom name prop', () => {
    render(<CurrencyInput value={0} onChangeCurrencyInput={mockOnChangeCurrencyInput} name='customName' />)

    const inputElement = screen.getByTestId('currency-input')
    expect(inputElement).toHaveAttribute('name', 'customName')
  })

  test('calls onChangeCurrencyInput when a valid value is entered', () => {
    render(<CurrencyInput value={0} onChangeCurrencyInput={mockOnChangeCurrencyInput} />)

    const inputElement = screen.getByTestId('currency-input')
    fireEvent.change(inputElement, { target: { value: '1000' } })

    expect(currencyUtils.checkValidCurrency).toHaveBeenCalledWith('1000')
    expect(currencyUtils.parseCurrencyInput).toHaveBeenCalledWith('1000')
    expect(mockOnChangeCurrencyInput).toHaveBeenCalledWith(1000)

    const errorMessage = screen.queryByTestId('currency-error-message')
    expect(errorMessage).not.toBeInTheDocument()
    const valueInput = screen.getByTestId('currency-input')
    expect(valueInput).toHaveValue('1000')
  })

  test('shows error message when an invalid value is entered', () => {
    ;(currencyUtils.checkValidCurrency as jest.Mock).mockReturnValue(false)

    render(<CurrencyInput value={0} onChangeCurrencyInput={mockOnChangeCurrencyInput} />)

    const inputElement = screen.getByTestId('currency-input')
    fireEvent.change(inputElement, { target: { value: 'invalid' } })

    expect(currencyUtils.checkValidCurrency).toHaveBeenCalledWith('invalid')
    expect(mockOnChangeCurrencyInput).not.toHaveBeenCalled()

    const errorMessage = screen.getByTestId('currency-error-message')
    expect(errorMessage).toBeInTheDocument()
  })

  test('formats the value on blur', () => {
    render(<CurrencyInput value={1000} onChangeCurrencyInput={mockOnChangeCurrencyInput} />)

    const inputElement = screen.getByTestId('currency-input')
    fireEvent.blur(inputElement)
    expect(inputElement).toHaveValue('1,000')
  })

  test('selects all text on focus', () => {
    render(<CurrencyInput value={1000} onChangeCurrencyInput={mockOnChangeCurrencyInput} />)

    const inputElement = screen.getByTestId('currency-input') as HTMLInputElement
    const selectSpy = jest.spyOn(inputElement, 'select')

    fireEvent.focus(inputElement)

    expect(selectSpy).toHaveBeenCalled()
  })
})
