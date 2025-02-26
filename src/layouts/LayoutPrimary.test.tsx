import { render, screen } from '@testing-library/react'
import LayoutPrimary from './LayoutPrimary' // Điều chỉnh đường dẫn import nếu cần

// Cách đơn giản nhất để mock Outlet
jest.mock('react-router', () => {
  return {
    Outlet: jest.fn(() => <div data-testid='mocked-outlet'>Mocked Outlet</div>)
  }
})

describe('LayoutPrimary Component', () => {
  it('renders the header with logo', () => {
    render(<LayoutPrimary />)

    // Kiểm tra header và logo
    const logoImage = screen.getByTestId('header').querySelector('img')
    expect(logoImage).toBeInTheDocument()
    expect(logoImage).toHaveAttribute('src', '/logo.png')
  })

  it('renders the Outlet component', () => {
    render(<LayoutPrimary />)

    // Kiểm tra Outlet đã được render
    const outletElement = screen.getByTestId('mocked-outlet')
    expect(outletElement).toBeInTheDocument()
  })

  it('applies custom className when provided', () => {
    render(<LayoutPrimary className='custom-class' />)

    // Lấy container chính
    const container = screen.getByTestId('mocked-outlet').parentElement
    expect(container).toHaveClass('custom-class')
  })
})
