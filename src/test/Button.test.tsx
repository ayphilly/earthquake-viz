import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from '../components/inputs/Button'

describe('Button Component', () => {
  it('renders with text', () => {
    render(<Button text="Click me" />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<Button text="Click me" Click={handleClick} />)

    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders loading state', () => {
    render(<Button text="Click me" loading={true} />)
    expect(screen.getByText('loading...')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button text="Click me" disabled={true} />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('renders secondary button type', () => {
    render(<Button text="Secondary" type="secondary" />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('border-sec-800')
  })

  it('renders back button type', () => {
    render(<Button type="back" />)
    expect(screen.getByText('Back')).toBeInTheDocument()
  })

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<Button text="Click me" Click={handleClick} disabled={true} />)

    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<Button text="Custom" className="custom-class" />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('renders with small size', () => {
    render(<Button text="Small" small={true} />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-[48px]')
  })
})