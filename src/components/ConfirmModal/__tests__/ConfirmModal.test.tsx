import { render, screen, fireEvent } from '@testing-library/react'
import ConfirmModal from '../ConfirmModal'
import * as currencyUtils from '@/utils/currency'
import * as dateUtils from '@/utils/date'

// Setup mocks for utility functions
jest.mock('@/utils/currency', () => ({
  formatCurrency: jest.fn(),
  formatDisplayValue: jest.fn()
}))
jest.mock('@/utils/date', () => ({
  formatMonth: jest.fn(),
  formatYear: jest.fn()
}))
jest.mock('@/utils/constants', () => ({
  MODAL_MESSAGES: {
    success: 'Success!',
    save: 'You will save',
    monthly: 'You will deposit'
  }
}))

describe('ConfirmModal', () => {
  const mockProps = {
    toggleModal: jest.fn(),
    amount: 12000,
    monthlyAmount: 500,
    totalMonths: 24,
    reachDate: new Date('2025-02-01')
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(currencyUtils.formatCurrency as jest.Mock).mockImplementation((value) => {
      if (value === 12000) return '$12,000.00'
      if (value === 500) return '$500.00'
      return `${value}.00`
    })
    ;(currencyUtils.formatDisplayValue as jest.Mock).mockImplementation((value) => {
      if (value === '$12,000.00') return '$12,000'
      if (value === '$500.00') return '$500'
      return value
    })
    ;(dateUtils.formatMonth as jest.Mock).mockReturnValue('February')
    ;(dateUtils.formatYear as jest.Mock).mockReturnValue(2025)
  })

  test('renders with correct title, amount and goal date', () => {
    render(<ConfirmModal isOpen={true} {...mockProps} />)
    // Check modal title
    expect(screen.getByTestId('modal-title')).toHaveTextContent('Success!')
    // Check total amount and goal date
    expect(screen.getByTestId('modal-total-amount')).toHaveTextContent('$12,000')
    expect(screen.getByTestId('modal-goal-date')).toHaveTextContent('February 2025')
  })

  test('renders monthly message with plural "months"', () => {
    render(<ConfirmModal isOpen={true} {...mockProps} />)
    expect(screen.getByTestId('modal-monthly-amount')).toHaveTextContent('$500')
    expect(screen.getByTestId('modal-total-months')).toHaveTextContent('24')
    expect(screen.getByTestId('modal-monthly-message').textContent).toContain('months')
  })

  test('renders monthly message with singular "month" when totalMonths is 1', () => {
    render(<ConfirmModal isOpen={true} {...mockProps} totalMonths={1} />)
    const message = screen.getByTestId('modal-monthly-message').textContent || ''
    expect(message).toContain('month.')
    expect(message).not.toContain('months')
  })

  test('does not call toggleModal when modal content is clicked', () => {
    render(<ConfirmModal isOpen={true} {...mockProps} />)
    fireEvent.click(screen.getByTestId('modal-container'))
    expect(mockProps.toggleModal).not.toHaveBeenCalled()
  })

  test('does not render when isOpen is false', () => {
    render(<ConfirmModal isOpen={false} {...mockProps} />)
    // Expect modal not to render anything
    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument()
  })
})
