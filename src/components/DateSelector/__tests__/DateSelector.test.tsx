import { render, screen, fireEvent } from '@testing-library/react'
import { formatMonth, formatYear, isDateInFuture, getNextMonth, getPreviousMonth } from '@/utils/date'
import DateSelector from '../DateSelector'

// Mock các utility functions từ @/utils/date
jest.mock('@/utils/date', () => ({
  formatMonth: jest.fn(),
  formatYear: jest.fn(),
  isDateInFuture: jest.fn(),
  getNextMonth: jest.fn(),
  getPreviousMonth: jest.fn()
}))

describe('DateSelector', () => {
  const mockDate = new Date('2025-02-15')
  const mockOnChangeDateSelector = jest.fn()
  const mockNextMonth = new Date('2025-03-15')
  const mockPreviousMonth = new Date('2025-01-15')

  beforeEach(() => {
    jest.clearAllMocks()

    // Cấu hình mặc định cho mock functions
    ;(formatMonth as jest.Mock).mockReturnValue('February')
    ;(formatYear as jest.Mock).mockReturnValue('2025')
    ;(getNextMonth as jest.Mock).mockReturnValue(mockNextMonth)
    ;(getPreviousMonth as jest.Mock).mockReturnValue(mockPreviousMonth)
    ;(isDateInFuture as jest.Mock).mockReturnValue(true)
  })

  test('renders correctly with selected date', () => {
    render(<DateSelector selectedDate={mockDate} onChangeDateSelector={mockOnChangeDateSelector} />)

    expect(screen.getByTestId('date-selector-container')).toBeInTheDocument()
    expect(screen.getByTestId('previous-month-button')).toBeInTheDocument()
    expect(screen.getByTestId('next-month-button')).toBeInTheDocument()
    expect(screen.getByTestId('month-display')).toHaveTextContent('February')
    expect(screen.getByTestId('year-display')).toHaveTextContent('2025')

    expect(formatMonth).toHaveBeenCalledWith(mockDate)
    expect(formatYear).toHaveBeenCalledWith(mockDate)
  })

  test('initializes with next month when selectedDate is not provided', () => {
    // Mock the current date for consistent testing
    const originalDate = global.Date
    const mockCurrentDate = new Date('2025-01-01')
    global.Date = jest.fn(() => mockCurrentDate) as unknown as DateConstructor

    // Render with undefined selectedDate
    render(<DateSelector selectedDate={undefined as unknown as Date} onChangeDateSelector={mockOnChangeDateSelector} />)

    // Verify that getNextMonth was called with the current date
    expect(getNextMonth).toHaveBeenCalledWith(mockCurrentDate)

    // Verify that onChangeDateSelector was called with the next month
    expect(mockOnChangeDateSelector).toHaveBeenCalledWith(mockNextMonth)

    // Restore original Date constructor
    global.Date = originalDate
  })

  test('handles next month button click', () => {
    render(<DateSelector selectedDate={mockDate} onChangeDateSelector={mockOnChangeDateSelector} />)

    // Click the next month button
    fireEvent.click(screen.getByTestId('next-month-button'))

    // Verify getNextMonth was called with the correct date
    expect(getNextMonth).toHaveBeenCalledWith(mockDate)

    // Verify onChangeDateSelector was called with the next month
    expect(mockOnChangeDateSelector).toHaveBeenCalledWith(mockNextMonth)
  })

  test('handles previous month button click when date is in future', () => {
    ;(isDateInFuture as jest.Mock).mockReturnValue(true)

    render(<DateSelector selectedDate={mockDate} onChangeDateSelector={mockOnChangeDateSelector} />)

    // Click the previous month button
    fireEvent.click(screen.getByTestId('previous-month-button'))

    // Verify getPreviousMonth was called
    expect(getPreviousMonth).toHaveBeenCalledWith(mockDate)

    // Verify isDateInFuture was called
    expect(isDateInFuture).toHaveBeenCalledWith(mockPreviousMonth)

    // Verify onChangeDateSelector was called
    expect(mockOnChangeDateSelector).toHaveBeenCalledWith(mockPreviousMonth)
  })

  test('does not change date when previous month is not in future', () => {
    ;(isDateInFuture as jest.Mock).mockReturnValue(false)

    render(<DateSelector selectedDate={mockDate} onChangeDateSelector={mockOnChangeDateSelector} />)

    // Click the previous month button
    fireEvent.click(screen.getByTestId('previous-month-button'))

    // Verify getPreviousMonth was called
    expect(getPreviousMonth).toHaveBeenCalledWith(mockDate)

    // Verify isDateInFuture was called
    expect(isDateInFuture).toHaveBeenCalledWith(mockPreviousMonth)

    // Verify onChangeDateSelector was NOT called
    expect(mockOnChangeDateSelector).not.toHaveBeenCalledWith(mockPreviousMonth)
  })

  test('handles left arrow key press', () => {
    ;(isDateInFuture as jest.Mock).mockReturnValue(true)

    render(<DateSelector selectedDate={mockDate} onChangeDateSelector={mockOnChangeDateSelector} />)

    // Focus the container
    const container = screen.getByTestId('date-selector-container')
    container.focus()

    // Press the left arrow key
    fireEvent.keyDown(container, { key: 'ArrowLeft' })

    // Verify getPreviousMonth was called
    expect(getPreviousMonth).toHaveBeenCalledWith(mockDate)

    // Verify isDateInFuture was called
    expect(isDateInFuture).toHaveBeenCalledWith(mockPreviousMonth)

    // Verify onChangeDateSelector was called
    expect(mockOnChangeDateSelector).toHaveBeenCalledWith(mockPreviousMonth)
  })

  test('handles right arrow key press', () => {
    render(<DateSelector selectedDate={mockDate} onChangeDateSelector={mockOnChangeDateSelector} />)

    // Focus the container
    const container = screen.getByTestId('date-selector-container')
    container.focus()

    // Press the right arrow key
    fireEvent.keyDown(container, { key: 'ArrowRight' })

    // Verify getNextMonth was called
    expect(getNextMonth).toHaveBeenCalledWith(mockDate)

    // Verify onChangeDateSelector was called
    expect(mockOnChangeDateSelector).toHaveBeenCalledWith(mockNextMonth)
  })

  test('ignores other key presses', () => {
    render(<DateSelector selectedDate={mockDate} onChangeDateSelector={mockOnChangeDateSelector} />)

    // Focus the container
    const container = screen.getByTestId('date-selector-container')
    container.focus()

    // Press a different key
    fireEvent.keyDown(container, { key: 'Enter' })

    // Verify the date functions were not called
    expect(getNextMonth).not.toHaveBeenCalled()
    expect(getPreviousMonth).not.toHaveBeenCalled()
    expect(mockOnChangeDateSelector).not.toHaveBeenCalled()
  })

  test('container click focuses the element', () => {
    render(<DateSelector selectedDate={mockDate} onChangeDateSelector={mockOnChangeDateSelector} />)

    const container = screen.getByTestId('date-selector-container')

    // Mock the focus method
    const focusMock = jest.fn()
    container.focus = focusMock

    // Click the container
    fireEvent.click(container)

    // Verify focus was called
    expect(focusMock).toHaveBeenCalled()
  })
})
