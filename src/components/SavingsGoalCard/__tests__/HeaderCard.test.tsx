import { render, screen } from '@testing-library/react'
import HeaderCard from '../HeaderCard'

describe('HeaderCard Component', () => {
  test('renders with correct title and subtitle', () => {
    render(<HeaderCard />)

    const title = screen.getByText('Buy a house')
    const subtitle = screen.getByText('Saving goal')
    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
  })
})
