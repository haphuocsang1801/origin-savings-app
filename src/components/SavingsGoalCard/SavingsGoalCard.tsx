import ConfirmModal from '@/components/ConfirmModal/ConfirmModal'
import CurrencyInput from '@/components/CurrencyInput/CurrencyInput'
import DateSelector from '@/components/DateSelector/DateSelector'
import MonthlyAmountSummary from '@/components/MonthlyAmountSummary/MonthlyAmountSummary'
import Button from '@/components/ui/Button'
import FormLabel from '@/components/ui/FormLabel'
import { useSavingsGoal } from '@/hooks/useSavingsGoal'
import React, { useState } from 'react'
import HeaderCard from './HeaderCard'

const SavingsGoalCard: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const { savingsGoal, handleAmountChange, handleDateChange } = useSavingsGoal()

  return (
    <>
      {/* Main Card */}
      <div className='w-full p-6 overflow-hidden bg-white rounded-lg md:px-10 md:py-8 shadow-level4'>
        <HeaderCard />

        {/* Input Fields */}
        <div className='flex flex-col gap-4 mb-8 md:flex-row'>
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
        <Button data-testid='confirm-button' className='mx-auto max-w-80' fullWidth onClick={() => setShowModal(true)}>
          Confirm
        </Button>
      </div>
      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showModal}
        toggleModal={() => setShowModal(!showModal)}
        amount={savingsGoal.amount}
        monthlyAmount={savingsGoal.monthlyAmount}
        totalMonths={savingsGoal.totalMonths}
        reachDate={savingsGoal.reachDate}
      />
    </>
  )
}

export default SavingsGoalCard
