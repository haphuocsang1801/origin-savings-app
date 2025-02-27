import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Modal from '../Modal'

describe('Modal Component', () => {
  const mockOnClose = jest.fn()
  const testId = 'test-modal'
  const childrenText = 'Modal content'

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} testId={testId}>
        {childrenText}
      </Modal>
    )

    expect(screen.queryByTestId(`${testId}-overlay`)).not.toBeInTheDocument()
  })

  it('should render when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} testId={testId}>
        {childrenText}
      </Modal>
    )

    expect(screen.getByTestId(`${testId}-overlay`)).toBeInTheDocument()
    expect(screen.getByTestId(`${testId}-container`)).toBeInTheDocument()
    expect(screen.getByTestId(`${testId}-close-button`)).toBeInTheDocument()
    expect(screen.getByText(childrenText)).toBeInTheDocument()
  })

  it('should call onClose when clicking the close button', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} testId={testId}>
        {childrenText}
      </Modal>
    )

    fireEvent.click(screen.getByTestId(`${testId}-close-button`))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when clicking the overlay', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} testId={testId}>
        {childrenText}
      </Modal>
    )

    fireEvent.click(screen.getByTestId(`${testId}-overlay`))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should NOT call onClose when clicking inside the modal content', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} testId={testId}>
        <div data-testid='modal-inner-content'>{childrenText}</div>
      </Modal>
    )

    fireEvent.click(screen.getByTestId('modal-inner-content'))
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('should call onClose when pressing the Escape key', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} testId={testId}>
        {childrenText}
      </Modal>
    )

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})
