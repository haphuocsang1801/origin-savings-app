import { calculateMonthlyAmount } from './calculations'
describe('calculateMonthlyAmount', () => {
  test('calculates monthly amount correctly for valid inputs', () => {
    expect(calculateMonthlyAmount(1200, 12)).toBe(100)
    expect(calculateMonthlyAmount(2400, 24)).toBe(100)
    expect(calculateMonthlyAmount(1000, 10)).toBe(100)
  })

  test('returns 0 for invalid inputs', () => {
    expect(calculateMonthlyAmount(-1200, 12)).toBe(0)
    expect(calculateMonthlyAmount(1200, -12)).toBe(0)
    expect(calculateMonthlyAmount(0, 12)).toBe(0)
    expect(calculateMonthlyAmount(1200, 0)).toBe(0)
  })
})
