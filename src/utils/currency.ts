export const formatCurrency = (value: number, options?: Intl.NumberFormatOptions): string => {
  return new Intl.NumberFormat('en-US', {
    ...options
  }).format(value)
}
export const checkValidCurrency = (value: string): boolean => {
  const currencyInputRegex = /^[0-9,\.]*$/

  if (!currencyInputRegex.test(value)) {
    return false
  }
  // Check for multiple dots
  const dotCount = (value.match(/\./g) || []).length
  if (dotCount > 1) {
    return false
  }
  // Check adjacent commas
  if (value.includes(',,') || value.includes(',,')) {
    return false
  }
  // Check adjacent dots and commas
  if (value.includes('.,') || value.includes(',.') || value.includes('..')) {
    return false
  }
  // Check commas and dots in the first position
  if (value.startsWith(',') || value.startsWith('.')) {
    return false
  }
  return true
}
export const parseCurrencyInput = (value: string): number => {
  const numericValue = value.replace(/[^0-9.]/g, '')
  const parts = numericValue.split('.')

  if (parts.length > 2) {
    parts.splice(2) // keep only the first two parts
  }

  if (parts[1]) {
    // keep only the first two digits after the decimal point
    parts[1] = parts[1].slice(0, 2)
  }

  const cleanValue = parts.join('.')
  return cleanValue ? parseFloat(cleanValue) : 0
}
export const formatDisplayValue = (value: string) => {
  const parts = value.split('.')
  if (parts.length === 2 && parts[1] === '00') {
    return parts[0]
  }
  return parts.join('.')
}
