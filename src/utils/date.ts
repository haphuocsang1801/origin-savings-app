export const formatMonth = (date: Date): string => {
  return date.toLocaleString('default', { month: 'long' })
}

export const formatYear = (date: Date): number => {
  return date.getFullYear()
}

export const calculateMonthDifference = (startDate: Date, endDate: Date): number => {
  return (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth()
}

export const isDateInFuture = (date: Date): boolean => {
  const today = new Date()
  return date > today
}

export const getNextMonth = (date: Date): Date => {
  const nextMonth = new Date(date)
  nextMonth.setMonth(nextMonth.getMonth() + 1)
  return nextMonth
}

export const getPreviousMonth = (date: Date): Date => {
  const previousMonth = new Date(date)
  previousMonth.setMonth(previousMonth.getMonth() - 1)
  return previousMonth
}
