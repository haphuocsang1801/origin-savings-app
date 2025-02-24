import React from 'react'
import classnames from 'classnames'

type ButtonVariant = 'primary'
type ButtonSize = 'md'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: React.ReactNode
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-brandColorPrimary hover:bg-opacity-80 text-white'
}

const buttonSizes: Record<ButtonSize, string> = {
  md: 'py-[18px]'
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  type = 'button',
  onClick,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classnames(
        'flex items-center justify-center font-semibold rounded-full transition-colors',
        buttonVariants[variant],
        buttonSizes[size],
        {
          'w-full': fullWidth,
          'w-auto': !fullWidth,
          'opacity-50 cursor-not-allowed': disabled
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
