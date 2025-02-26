// SavingsGoalCard.test.tsx
import { fireEvent, render, screen } from '@testing-library/react'
import { useSavingsGoal } from '@/hooks/useSavingsGoal'
import SavingsGoalCard from '../SavingsGoalCard'
jest.mock('@/hooks/useSavingsGoal')

describe('SavingsGoalCard', () => {
  const mockHandleAmountChange = jest.fn()
  const mockHandleDateChange = jest.fn()

  beforeEach(() => {
    const mockDate = new Date('2025-01-15')
    // Mock implementation của hook
    ;(useSavingsGoal as jest.Mock).mockReturnValue({
      savingsGoal: {
        amount: 10000,
        reachDate: mockDate,
        monthlyAmount: 1000,
        totalMonths: 10
      },
      handleAmountChange: mockHandleAmountChange,
      handleDateChange: mockHandleDateChange
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders correctly with mocked hook values', () => {
    const { getByTestId } = render(<SavingsGoalCard />)
    expect(getByTestId('monthLy-amount')).toHaveTextContent('$1,000')
    expect(getByTestId('totalMonths')).toHaveTextContent('10')
    expect(getByTestId('totalAmount')).toHaveTextContent('$10,000')
    expect(getByTestId('goalDate')).toHaveTextContent('January 2025')
  })

  test('should call handleAmountChange when amount input changes', () => {
    render(<SavingsGoalCard />)

    const amountInput = screen.getByTestId('currency-input')
    fireEvent.change(amountInput, { target: { value: '25000' } })

    expect(mockHandleAmountChange).toHaveBeenCalled()
  })

  test('should call handleDateChange when date selector buttons are clicked', () => {
    render(<SavingsGoalCard />)

    // Test next month button
    const nextMonthButton = screen.getByTestId('next-month-button')
    fireEvent.click(nextMonthButton)
    expect(mockHandleDateChange).toHaveBeenCalled()

    mockHandleDateChange.mockClear()

    // Test previous month button
    const previousMonthButton = screen.getByTestId('previous-month-button')
    fireEvent.click(previousMonthButton)
    expect(mockHandleDateChange).not.toHaveBeenCalled()
  })

  test('should call handleDateChange when date is changed using keyboard', () => {
    render(<SavingsGoalCard />)

    const container = screen.getByTestId('date-selector-container')
    fireEvent.focus(container)
    fireEvent.keyDown(container, { key: 'ArrowRight' })
    expect(mockHandleDateChange).toHaveBeenCalled()

    mockHandleDateChange.mockClear()

    fireEvent.keyDown(container, { key: 'ArrowLeft' })
    expect(mockHandleDateChange).not.toHaveBeenCalled()
  })

  test('should display modal when button is clicked', () => {
    render(<SavingsGoalCard />)

    // Click the Confirm button
    fireEvent.click(screen.getByTestId('confirm-button'))

    // Check if the ConfirmModal is displayed
    expect(screen.getByTestId('modal-confirm-modal-overlay')).toBeInTheDocument()
  })

  test('should close modal when closing the modal', () => {
    render(<SavingsGoalCard />)

    // Open the modal
    fireEvent.click(screen.getByTestId('confirm-button'))
    expect(screen.getByTestId('modal-confirm-modal-overlay')).toBeInTheDocument()

    // Close the modal
    fireEvent.click(screen.getByTestId('modal-close-button'))

    // Modal should no longer be in the document
    expect(screen.queryByTestId('modal-confirm-modal-overlay')).not.toBeInTheDocument()
  })
})
