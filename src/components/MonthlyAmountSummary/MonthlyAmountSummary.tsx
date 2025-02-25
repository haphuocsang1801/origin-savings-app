import { formatCurrency, formatDisplayValue } from '@/utils/currency'
import { formatMonth, formatYear } from '@/utils/date'

interface MonthlyAmountSummaryProps {
  monthlyAmount: number
  totalMonths: number
  amount: number
  reachDate: Date
}

const MonthlyAmountSummary = ({ monthlyAmount, totalMonths, amount, reachDate }: MonthlyAmountSummaryProps) => {
  return (
    <div className='mb-8 overflow-hidden border rounded-lg border-blueGray50'>
      <div className='flex items-center justify-between gap-2 p-6 md:pt-6 md:pb-4 md:px-8'>
        <span className='flex-shrink-0 text-lg md:text-xl text-blueGray900'>Monthly amount</span>
        <span className='text-2xl md:text-[32px] font-medium text-brandColorSecondary font-rubik break-all'>
          $
          {formatDisplayValue(
            formatCurrency(monthlyAmount, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })
          )}
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
