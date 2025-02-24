export const formatCurrency = (value: number, options?: Intl.NumberFormatOptions): string => {
  return new Intl.NumberFormat('en-US', {
    ...options
  }).format(value)
}

export const parseCurrencyInput = (value: string): number => {
  const numericValue = value.replace(/[^0-9.]/g, '')
  const parts = numericValue.split('.')

  if (parts.length > 2) {
    parts.splice(2)
  }

  if (parts[1]) {
    parts[1] = parts[1].slice(0, 2)
  }

  const cleanValue = parts.join('.')
  return cleanValue ? parseFloat(cleanValue) : 0
}
