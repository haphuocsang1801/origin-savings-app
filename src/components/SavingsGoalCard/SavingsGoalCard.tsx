import ConfirmModal from '@/components/ConfirmModal/ConfirmModal'
import CurrencyInput from '@/components/CurrencyInput/CurrencyInput'
import DateSelector from '@/components/DateSelector/DateSelector'
import MonthlyAmountSummary from '@/components/MonthlyAmountSummary/MonthlyAmountSummary'
import Button from '@/components/ui/Button'
import FormLabel from '@/components/ui/FormLabel'
import { SavingsGoal } from '@/types'
import { calculateMonthlyAmount } from '@/utils/calculations'
import { DEFAULT_AMOUNT } from '@/utils/constants'
import { calculateMonthDifference } from '@/utils/date'
import React, { useEffect, useState } from 'react'
import HeaderCard from './HeaderCard'

const SavingsGoalCard: React.FC = () => {
  // State management
  const [savingsGoal, setSavingsGoal] = useState<SavingsGoal>({
    amount: DEFAULT_AMOUNT,
    reachDate: new Date(),
    monthlyAmount: 0,
    totalMonths: 0
  })
  const [showModal, setShowModal] = useState<boolean>(false)

  // Set initial reach date to next month
  useEffect(() => {
    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    setSavingsGoal((prev) => ({ ...prev, reachDate: nextMonth }))
  }, [])

  // Calculate monthly amount when amount or date changes
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

  return (
    <>
      {/* Main Card */}
      <div className='w-full p-6 overflow-hidden bg-white rounded-lg md:px-10 md:py-8 shadow-level4'>
        <HeaderCard />

        {/* Input Fields */}
        <div className='flex items-center gap-4 mb-8'>
          {/* Amount Input */}
          <FormLabel label='Total amount' htmlFor='amount' className='flex-1 w-full'>
            <CurrencyInput value={savingsGoal.amount} onChangeCurrencyInput={handleAmountChange} name='amount' />
          </FormLabel>

          {/* Date Selector */}
          <FormLabel label='Reach goal by' className='w-[192px]'>
            <DateSelector
              selectedDate={savingsGoal.reachDate}
              onChangeDateSelector={handleDateChange}
              className='w-full'
            />
          </FormLabel>
        </div>

        {/* Monthly Amount Summary */}
        <MonthlyAmountSummary
          monthlyAmount={savingsGoal.monthlyAmount}
          totalMonths={savingsGoal.totalMonths}
          amount={savingsGoal.amount}
          reachDate={savingsGoal.reachDate}
        />

        {/* Card Footer */}
        <Button className='mx-auto max-w-80' fullWidth onClick={() => setShowModal(true)}>
          Confirm
        </Button>
      </div>
      {/* Confirmation Modal */}
      {showModal && (
        <ConfirmModal
          onClose={() => setShowModal(false)}
          amount={savingsGoal.amount}
          monthlyAmount={savingsGoal.monthlyAmount}
          totalMonths={savingsGoal.totalMonths}
          reachDate={savingsGoal.reachDate}
        />
      )}
    </>
  )
}

export default SavingsGoalCard
