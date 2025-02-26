import { formatCurrency, checkValidCurrency, parseCurrencyInput, formatDisplayValue } from './currency'

describe('formatCurrency', () => {
  test('formats integers correctly', () => {
    expect(formatCurrency(1000)).toBe('1,000')
    expect(formatCurrency(0)).toBe('0')
    expect(formatCurrency(9999999)).toBe('9,999,999')
  })

  test('formats decimal values correctly', () => {
    expect(formatCurrency(1000.5)).toBe('1,000.5')
    expect(formatCurrency(1000.55)).toBe('1,000.55')
    expect(formatCurrency(0.99)).toBe('0.99')
  })

  test('handles options correctly', () => {
    expect(formatCurrency(1000, { style: 'currency', currency: 'USD' })).toBe('$1,000.00')
    expect(formatCurrency(1000.55, { style: 'currency', currency: 'EUR' })).toBe('€1,000.55')
    expect(formatCurrency(1000.55, { maximumFractionDigits: 0 })).toBe('1,001')
    expect(formatCurrency(1000.55, { minimumFractionDigits: 3 })).toBe('1,000.550')
  })
})

describe('checkValidCurrency', () => {
  test('validates correct currency inputs', () => {
    expect(checkValidCurrency('1000')).toBe(true)
    expect(checkValidCurrency('1,000')).toBe(true)
    expect(checkValidCurrency('1,000.50')).toBe(true)
    expect(checkValidCurrency('0.99')).toBe(true)
    expect(checkValidCurrency('')).toBe(true)
  })

  test('rejects inputs with multiple dots', () => {
    expect(checkValidCurrency('1000.50.25')).toBe(false)
    expect(checkValidCurrency('1.2.3')).toBe(false)
  })

  test('rejects inputs with invalid characters', () => {
    expect(checkValidCurrency('100a')).toBe(false)
    expect(checkValidCurrency('$1000')).toBe(false)
    expect(checkValidCurrency('1000€')).toBe(false)
    expect(checkValidCurrency('1,000-')).toBe(false)
  })

  test('rejects inputs with adjacent commas or dots', () => {
    expect(checkValidCurrency('1,,000')).toBe(false)
    expect(checkValidCurrency('1,.000')).toBe(false)
    expect(checkValidCurrency('1.,000')).toBe(false)
    expect(checkValidCurrency('1..000')).toBe(false)
  })

  test('rejects inputs with leading commas or dots', () => {
    expect(checkValidCurrency('.100')).toBe(false)
    expect(checkValidCurrency(',100')).toBe(false)
  })
})

describe('parseCurrencyInput', () => {
  test('parses basic numbers correctly', () => {
    expect(parseCurrencyInput('1000')).toBe(1000)
    expect(parseCurrencyInput('0')).toBe(0)
    expect(parseCurrencyInput('999')).toBe(999)
  })

  test('parses decimal values correctly', () => {
    expect(parseCurrencyInput('1000.50')).toBe(1000.5)
    expect(parseCurrencyInput('0.99')).toBe(0.99)
    expect(parseCurrencyInput('0.9')).toBe(0.9)
  })

  test('ignores commas and non-numeric characters', () => {
    expect(parseCurrencyInput('1,000')).toBe(1000)
    expect(parseCurrencyInput('1,000.50')).toBe(1000.5)
    expect(parseCurrencyInput('$1,000.50')).toBe(1000.5)
  })

  test('truncates more than two decimal places', () => {
    expect(parseCurrencyInput('1000.555')).toBe(1000.55)
    expect(parseCurrencyInput('0.999')).toBe(0.99)
  })

  test('handles multiple decimal points by using only the first two parts', () => {
    expect(parseCurrencyInput('1000.50.25')).toBe(1000.5)
    expect(parseCurrencyInput('1.2.3')).toBe(1.2)
  })

  test('returns 0 for empty or invalid inputs', () => {
    expect(parseCurrencyInput('')).toBe(0)
    expect(parseCurrencyInput('abc')).toBe(0)
  })
})

describe('formatDisplayValue', () => {
  test('removes decimal part if it is .00', () => {
    expect(formatDisplayValue('1000.00')).toBe('1000')
    expect(formatDisplayValue('0.00')).toBe('0')
  })

  test('keeps decimal part if it is not .00', () => {
    expect(formatDisplayValue('1000.50')).toBe('1000.50')
    expect(formatDisplayValue('0.99')).toBe('0.99')
    expect(formatDisplayValue('1000.01')).toBe('1000.01')
  })

  test('preserves the original format for non-decimal values', () => {
    expect(formatDisplayValue('1000')).toBe('1000')
    expect(formatDisplayValue('0')).toBe('0')
  })
})
