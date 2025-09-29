import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Loader from '../components/Loader'

vi.mock('gsap', () => ({
  gsap: {
    timeline: vi.fn(() => ({
      fromTo: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    })),
  },
}))

describe('Loader Component', () => {
  it('renders loading text', () => {
    render(<Loader />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders three loading dots', () => {
    render(<Loader />)
    const loadingDots = document.querySelectorAll('.load-box')
    expect(loadingDots).toHaveLength(3)
  })

  it('has correct styling classes', () => {
    render(<Loader />)
    const container = screen.getByText('Loading...').parentElement
    expect(container).toHaveClass('w-fit', 'flex', 'flex-col', 'items-center')
  })

  it('applies correct background colors to dots', () => {
    render(<Loader />)
    const loadingDots = document.querySelectorAll('.load-box')

    expect(loadingDots[0]).toHaveClass('bg-main-200')
    expect(loadingDots[1]).toHaveClass('bg-main-300')
    expect(loadingDots[2]).toHaveClass('bg-main-400')
  })

  it('has proper dot styling', () => {
    render(<Loader />)
    const firstDot = document.querySelector('.load-box')

    expect(firstDot).toHaveClass(
      'h-[.5em]',
      'w-[.5em]',
      'rounded-full'
    )
  })
})