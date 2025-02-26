import { render, screen, fireEvent } from '@testing-library/react'
import * as currencyUtils from '@/utils/currency'
import * as dateUtils from '@/utils/date'
import { MODAL_MESSAGES } from '@/utils/constants'
import ConfirmModal from '../ConfirmModal'

// Mock utility functions
jest.mock('@/utils/currency', () => ({
  formatCurrency: jest.fn(),
  formatDisplayValue: jest.fn()
}))

jest.mock('@/utils/date', () => ({
  formatMonth: jest.fn(),
  formatYear: jest.fn()
}))

// Mock constants
jest.mock('@/utils/constants', () => ({
  MODAL_MESSAGES: {
    success: 'Success!',
    save: 'You will save',
    monthly: 'You will deposit'
  }
}))

describe('ConfirmModal', () => {
  // Mock props for testing
  const mockProps = {
    onClose: jest.fn(),
    amount: 12000,
    monthlyAmount: 500,
    totalMonths: 24,
    reachDate: new Date('2025-02-01')
  }

  // Setup before each test
  beforeEach(() => {
    jest.clearAllMocks() // Set default mock return values
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

  test('renders modal with correct title', () => {
    render(<ConfirmModal {...mockProps} />)

    const title = screen.getByTestId('modal-title')
    expect(title).toHaveTextContent(MODAL_MESSAGES.success)
  })

  test('displays the correct amount and goal date', () => {
    render(<ConfirmModal {...mockProps} />)

    const totalAmount = screen.getByTestId('modal-total-amount')
    expect(totalAmount).toHaveTextContent('$12,000')

    const goalDate = screen.getByTestId('modal-goal-date')
    expect(goalDate).toHaveTextContent('February 2025')
  })

  test('displays the correct monthly amount and total months', () => {
    render(<ConfirmModal {...mockProps} />)

    const monthlyAmount = screen.getByTestId('modal-monthly-amount')
    expect(monthlyAmount).toHaveTextContent('$500')

    const totalMonths = screen.getByTestId('modal-total-months')
    expect(totalMonths).toHaveTextContent('24')

    // Check pluralization of months
    const monthlyMessage = screen.getByTestId('modal-monthly-message')
    expect(monthlyMessage.textContent).toContain('months')
  })

  test('uses singular "month" when totalMonths is 1', () => {
    render(<ConfirmModal {...mockProps} totalMonths={1} />)

    const monthlyMessage = screen.getByTestId('modal-monthly-message')
    expect(monthlyMessage.textContent).toContain('month.')
    expect(monthlyMessage.textContent).not.toContain('months')
  })

  test('closes modal when close button is clicked', () => {
    render(<ConfirmModal {...mockProps} />)

    const closeButton = screen.getByTestId('modal-close-button')
    fireEvent.click(closeButton)

    expect(mockProps.onClose).toHaveBeenCalledTimes(1)
  })

  test('closes modal when X button is clicked', () => {
    render(<ConfirmModal {...mockProps} />)

    const closeXButton = screen.getByTestId('modal-close-modal-button')
    fireEvent.click(closeXButton)

    expect(mockProps.onClose).toHaveBeenCalledTimes(1)
  })

  test('closes modal when clicking on overlay', () => {
    render(<ConfirmModal {...mockProps} />)

    const overlay = screen.getByTestId('modal-confirm-modal-overlay')
    // Simulate clicking on the overlay but not on the modal content
    fireEvent.click(overlay)

    expect(mockProps.onClose).toHaveBeenCalledTimes(1)
  })

  test('does not close modal when clicking on modal content', () => {
    render(<ConfirmModal {...mockProps} />)

    const modalContainer = screen.getByTestId('modal-confirm-modal-container')
    fireEvent.click(modalContainer)

    expect(mockProps.onClose).not.toHaveBeenCalled()
  })

  test('closes modal when Escape key is pressed', () => {
    render(<ConfirmModal {...mockProps} />)

    // Simulate pressing the Escape key
    fireEvent.keyDown(window, { key: 'Escape' })

    expect(mockProps.onClose).toHaveBeenCalledTimes(1)
  })

  test('does not close modal when other keys are pressed', () => {
    render(<ConfirmModal {...mockProps} />)

    // Simulate pressing a different key
    fireEvent.keyDown(window, { key: 'Enter' })

    expect(mockProps.onClose).not.toHaveBeenCalled()
  })
})
