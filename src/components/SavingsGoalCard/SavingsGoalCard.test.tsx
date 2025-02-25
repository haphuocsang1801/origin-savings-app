import { useSavingsGoal } from '@/hooks/useSavingsGoal'
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import SavingsGoalCard from './SavingsGoalCard'

// Mock the useSavingsGoal hook
jest.mock('@/hooks/useSavingsGoal')

const mockUseSavingsGoal = useSavingsGoal as jest.MockedFunction<typeof useSavingsGoal>

describe('SavingsGoalCard', () => {
  beforeEach(() => {
    mockUseSavingsGoal.mockReturnValue({
      savingsGoal: {
        amount: 1000,
        reachDate: new Date(),
        monthlyAmount: 100,
        totalMonths: 10
      },
      handleAmountChange: jest.fn(),
      handleDateChange: jest.fn()
    })
  })

  test('renders SavingsGoalCard component', () => {
    render(<SavingsGoalCard />)
    expect(screen.getByText('Total amount')).toBeInTheDocument()
    expect(screen.getByText('Reach goal by')).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })
})
