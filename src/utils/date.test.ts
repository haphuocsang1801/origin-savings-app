import { formatMonth, formatYear, calculateMonthDifference, isDateInFuture, getNextMonth, getPreviousMonth } from './date'

describe('date utils', () => {
  test('formatMonth should return the correct month name', () => {
    const date = new Date('2023-01-01')
    expect(formatMonth(date)).toBe('January')
  })

  test('formatYear should return the correct year', () => {
    const date = new Date('2023-01-01')
    expect(formatYear(date)).toBe(2023)
  })

  test('calculateMonthDifference should return the correct month difference', () => {
    const startDate = new Date('2023-01-01')
    const endDate = new Date('2023-12-01')
    expect(calculateMonthDifference(startDate, endDate)).toBe(11)
  })

  test('isDateInFuture should return true for future dates', () => {
    const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24)
    expect(isDateInFuture(futureDate)).toBe(true)
  })

  test('getNextMonth should return the correct next month', () => {
    const date = new Date('2023-01-01')
    const nextMonth = getNextMonth(date)
    expect(nextMonth.getMonth()).toBe(1)
  })

  test('getPreviousMonth should return the correct previous month', () => {
    const date = new Date('2023-01-01')
    const previousMonth = getPreviousMonth(date)
    expect(previousMonth.getMonth()).toBe(11)
  })
})
