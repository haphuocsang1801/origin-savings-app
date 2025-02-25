import { SavingsGoal } from '@/types'
import { calculateMonthlyAmount } from '@/utils/calculations'
import { DEFAULT_AMOUNT } from '@/utils/constants'
import { calculateMonthDifference } from '@/utils/date'
import { useEffect, useState } from 'react'

export const useSavingsGoal = (initialValues: Partial<SavingsGoal> = {}) => {
  const {
    amount = DEFAULT_AMOUNT,
    reachDate = new Date(),
    monthlyAmount = 0,
    totalMonths = 0
  } = initialValues

  const [savingsGoal, setSavingsGoal] = useState<SavingsGoal>({
    amount,
    reachDate,
    monthlyAmount,
    totalMonths
  })

  useEffect(() => {
    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    setSavingsGoal((prev) => ({ ...prev, reachDate: nextMonth }))
  }, [])

  useEffect(() => {
    const currentDate = new Date()
    const months = calculateMonthDifference(currentDate, savingsGoal.reachDate)
    const monthlyAmount = calculateMonthlyAmount(savingsGoal.amount, months)

    setSavingsGoal((prev) => ({
      ...prev,
      totalMonths: months,
      monthlyAmount
    }))
  }, [savingsGoal.amount, savingsGoal.reachDate])

  const handleAmountChange = (newAmount: number) => {
    setSavingsGoal((prev) => ({ ...prev, amount: newAmount }))
  }

  const handleDateChange = (newDate: Date) => {
    setSavingsGoal((prev) => ({ ...prev, reachDate: newDate }))
  }

  return {
    savingsGoal,
    handleAmountChange,
    handleDateChange
  }
}