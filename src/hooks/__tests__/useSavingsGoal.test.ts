import { renderHook, act } from '@testing-library/react'
import { useSavingsGoal } from '@/hooks/useSavingsGoal'
import { DEFAULT_AMOUNT } from '@/utils/constants'

describe('useSavingsGoal', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useSavingsGoal())
    expect(result.current.savingsGoal.amount).toBe(DEFAULT_AMOUNT)
    expect(result.current.savingsGoal.monthlyAmount).toBe(DEFAULT_AMOUNT)
    expect(result.current.savingsGoal.totalMonths).toBe(1)
    expect(result.current.savingsGoal.reachDate).toBeInstanceOf(Date)
  })

  test('should update amount correctly', () => {
    const { result } = renderHook(() => useSavingsGoal())

    act(() => {
      result.current.handleAmountChange(5000)
    })

    expect(result.current.savingsGoal.amount).toBe(5000)
  })

  test('should update reach date correctly', () => {
    const { result } = renderHook(() => useSavingsGoal())
    const newDate = new Date()
    newDate.setFullYear(newDate.getFullYear() + 1)

    act(() => {
      result.current.handleDateChange(newDate)
    })

    expect(result.current.savingsGoal.reachDate).toBe(newDate)
  })
})
