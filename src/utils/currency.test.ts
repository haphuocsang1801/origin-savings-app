import { formatCurrency, parseCurrencyInput } from './currency'

describe('currency utils', () => {
  test('formatCurrency should format the number correctly', () => {
    expect(formatCurrency(1234.56)).toBe('1,234.56')
  })

  test('parseCurrencyInput should parse the currency input correctly', () => {
    expect(parseCurrencyInput('$1,234.56')).toBe(1234.56)
  })
})
