import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../Button'

describe('Button Component', () => {
  test('renders correctly', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByTestId('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
  })

  test('applies primary variant styles by default', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByTestId('button')
    expect(button).toHaveClass('bg-brandColorPrimary')
  })

  test('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    const button = screen.getByTestId('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('applies fullWidth class when fullWidth prop is true', () => {
    render(<Button fullWidth>Click me</Button>)
    const button = screen.getByTestId('button')
    expect(button).toHaveClass('w-full')
    expect(button).not.toHaveClass('w-auto')
  })

  test('applies disabled styles when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    const button = screen.getByTestId('button')
    expect(button).toHaveClass('opacity-50')
    expect(button).toHaveClass('cursor-not-allowed')
    expect(button).toBeDisabled()
  })

  test('applies custom className when provided', () => {
    render(<Button className='custom-class'>Click me</Button>)
    const button = screen.getByTestId('button')
    expect(button).toHaveClass('custom-class')
  })

  test('uses custom data-testid when provided', () => {
    render(<Button data-testid='custom-button'>Click me</Button>)
    const button = screen.getByTestId('custom-button')
    expect(button).toBeInTheDocument()
  })
})
