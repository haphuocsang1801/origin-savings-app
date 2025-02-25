import { render, screen } from '@testing-library/react'
import { formatCurrency, formatDisplayValue } from '@/utils/currency'
import { formatMonth, formatYear } from '@/utils/date'
import MonthlyAmountSummary from '../MonthlyAmountSummary'

// Mock utility functions
jest.mock('@/utils/currency', () => ({
  formatCurrency: jest.fn(),
  formatDisplayValue: jest.fn()
}))

jest.mock('@/utils/date', () => ({
  formatMonth: jest.fn(),
  formatYear: jest.fn()
}))

describe('MonthlyAmountSummary', () => {
  //Setup mock and test data
  const mockProps = {
    monthlyAmount: 500,
    totalMonths: 24,
    amount: 12000,
    reachDate: new Date('2025-12-31')
  }

  beforeEach(() => {
    jest.clearAllMocks()

    // Mocking the utility functions to return specific values
    ;(formatCurrency as jest.Mock).mockReturnValue('$500.00')
    ;(formatDisplayValue as jest.Mock).mockReturnValue('$500.00')
    ;(formatMonth as jest.Mock).mockReturnValue('December')
    ;(formatYear as jest.Mock).mockReturnValue('2025')
  })

  test('renders component correctly with provided props', () => {
    render(<MonthlyAmountSummary {...mockProps} />)

    // Check elements by test id
    expect(screen.getByTestId('monthLy-amount-label')).toHaveTextContent('Monthly amount')
    expect(screen.getByTestId('monthLy-amount')).toHaveTextContent('$500.00')
    expect(screen.getByTestId('totalMonths')).toHaveTextContent('24 monthly deposits')
    expect(screen.getByTestId('totalAmount')).toHaveTextContent('$500.00')
    expect(screen.getByTestId('goalDate')).toHaveTextContent('December 2025')
  })
})
