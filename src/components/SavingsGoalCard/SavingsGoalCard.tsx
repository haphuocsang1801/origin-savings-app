import React, { useState, useEffect } from 'react'
import { SavingsGoal } from '@/types'
import CurrencyInput from '@/components/CurrencyInput/CurrencyInput'
import DateSelector from '@/components/DateSelector/DateSelector'
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal'
import { DEFAULT_AMOUNT } from '@/utils/constants'
import { calculateMonthDifference } from '@/utils/date'
import { calculateMonthlyAmount } from '@/utils/calculations'
import LayoutPrimary from '@/layouts/LayoutPrimary'
import FormLabel from '@/components/ui/FormLabel'
import MonthlyAmountSummary from '@/components/MonthlyAmountSummary/MonthlyAmountSummary'
import Button from '@/components/ui/Button'

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

  // Handlers
  const handleAmountChange = (newAmount: number) => {
    setSavingsGoal((prev) => ({ ...prev, amount: newAmount }))
  }

  const handleDateChange = (newDate: Date) => {
    setSavingsGoal((prev) => ({ ...prev, reachDate: newDate }))
  }

  return (
    <LayoutPrimary>
      <div className='max-w-[560px] mx-auto w-full'>
        {/* Title */}
        <h1 className='mt-8 mb-6 text-lg text-center md:text-xl md:mt-12 md:mb-6 text-brandColorPrimary'>
          Let's plan your <span className='font-semibold '>saving goal</span>
        </h1>

        {/* Main Card */}
        <div className='w-full p-6 overflow-hidden bg-white rounded-lg md:px-10 md:py-8 shadow-level4'>
          {/* Card Header */}
          <div className='flex items-center mb-[18px] md:mb-6'>
            <div className='flex items-center justify-center mr-4 size-16'>
              <img src='/icon-home.png' alt='Home Icon' className='w-full h-full text-blue-600' />
            </div>
            <div>
              <h2 className='text-xl font-medium md:text-2xl text-blueGray900 font-rubik'>Buy a house</h2>
              <p className='text-sm md:text-base text-blueGray400'>Saving goal</p>
            </div>
          </div>

          {/* Input Fields */}
          <div className='flex flex-col items-center gap-4 mb-6 md:mb-8 md:flex-row '>
            {/* Amount Input */}
            <FormLabel label='Total amount' htmlFor='amount' className='flex-1 w-full'>
              <CurrencyInput value={savingsGoal.amount} onChangeCurrencyInput={handleAmountChange} name='amount' />
            </FormLabel>

            {/* Date Selector */}
            <FormLabel label='Reach goal by' className='w-full md:w-[192px]'>
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
    </LayoutPrimary>
  )
}

export default SavingsGoalCard
