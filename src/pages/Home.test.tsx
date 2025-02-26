import { render, screen } from '@testing-library/react'
import Home from './Home'
import '@testing-library/jest-dom'

// Mock the SavingsGoalCard component
jest.mock('@/components/SavingsGoalCard/SavingsGoalCard', () => {
  return function MockedSavingsGoalCard() {
    return <div data-testid='savings-goal-card'>Mocked SavingsGoalCard</div>
  }
})

describe('Home Component', () => {
  test('should set document title to "Savings Goal"', () => {
    render(<Home />)
    expect(document.title).toBe('Savings Goal')
  })

  test('should render heading with correct text', () => {
    render(<Home />)
    const headingElement = screen.getByRole('heading', { level: 1 })
    expect(headingElement).toHaveTextContent("Let's plan your saving goal")
  })

  test('should render SavingsGoalCard component', () => {
    render(<Home />)
    expect(screen.getByTestId('savings-goal-card')).toBeInTheDocument()
  })
})
