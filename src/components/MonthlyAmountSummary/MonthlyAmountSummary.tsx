import React from 'react'

interface MonthlyAmountSummaryProps {
  monthlyAmount: number
  totalMonths: number
  amount: number
  reachDate: Date
}

const MonthlyAmountSummary: React.FC<MonthlyAmountSummaryProps> = ({
  monthlyAmount,
  totalMonths,
  amount,
  reachDate
}) => {
  const formatMonth = (date: Date): string => {
    return date.toLocaleString('default', { month: 'long' })
  }

  const formatYear = (date: Date): number => {
    return date.getFullYear()
  }

  return (
    <div className='mb-8 overflow-hidden border rounded-lg border-blueGray50'>
      <div className='flex items-center justify-between p-6 md:pt-6 md:pb-4 md:px-8'>
        <span className='text-lg md:text-xl text-blueGray900'>Monthly amount</span>
        <span className='text-2xl md:text-[32px] font-medium text-brandColorSecondary font-rubik'>
          $
          {monthlyAmount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </span>
      </div>
      <div className='flex items-center justify-center px-6 py-8 text-center md:px-8 md:py-6 md:text-left bg-blueGray10'>
        <p className='text-xs text-[#1C1E1F] '>
          You're planning <strong className='font-semibold'>{totalMonths} monthly deposits</strong> to reach your
          <strong className='font-semibold'> ${amount.toLocaleString('en-US')}</strong> goal by{' '}
          <strong className='font-semibold'>
            {formatMonth(reachDate)} {formatYear(reachDate)}.
          </strong>
        </p>
      </div>
    </div>
  )
}

export default MonthlyAmountSummary
