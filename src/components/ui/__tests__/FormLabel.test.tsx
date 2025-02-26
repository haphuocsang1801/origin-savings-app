import { render, screen } from '@testing-library/react'
import FormLabel from '../FormLabel'

describe('FormLabel Component', () => {
  test('renders correctly with label text', () => {
    render(<FormLabel label='Username'>Input field</FormLabel>)
    const formLabel = screen.getByTestId('form-label')
    expect(formLabel).toBeInTheDocument()
    expect(screen.getByText('Username')).toBeInTheDocument()
  })

  test('renders children correctly', () => {
    render(
      <FormLabel label='Email'>
        <input type='email' placeholder='Enter email' />
      </FormLabel>
    )
    const input = screen.getByPlaceholderText('Enter email')
    expect(input).toBeInTheDocument()
  })

  test('applies htmlFor attribute to label element', () => {
    render(
      <FormLabel label='Password' htmlFor='password-input'>
        <input id='password-input' type='password' />
      </FormLabel>
    )
    const labelElement = screen.getByText('Password')
    expect(labelElement).toHaveAttribute('for', 'password-input')
  })

  test('applies custom className when provided', () => {
    render(
      <FormLabel label='Name' className='custom-class'>
        <input type='text' />
      </FormLabel>
    )
    const formLabel = screen.getByTestId('form-label')
    expect(formLabel).toHaveClass('custom-class')
    expect(formLabel).toHaveClass('flex')
    expect(formLabel).toHaveClass('flex-col')
  })

  test('uses custom data-testid when provided', () => {
    render(
      <FormLabel label='Address' data-testid='custom-form-label'>
        <input type='text' />
      </FormLabel>
    )
    const formLabel = screen.getByTestId('custom-form-label')
    expect(formLabel).toBeInTheDocument()
  })
})
