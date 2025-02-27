import classNames from 'classnames'
import React, { useEffect, ReactNode } from 'react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  overlayClassName?: string
  contentClassName?: string
  testId?: string
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  testId = 'modal'
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={classNames(
        `fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50`,
        overlayClassName
      )}
      onClick={handleOverlayClick}
      data-testid={`${testId}-overlay`}
    >
      <div
        className={classNames('relative w-full max-w-md bg-white rounded-lg', className)}
        data-testid={`${testId}-container`}
      >
        <button
          onClick={onClose}
          className='absolute text-gray-400 transition-colors top-4 right-4 hover:text-gray-500'
          aria-label='Close modal'
          data-testid={`${testId}-close-button`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
          </svg>
        </button>

        <div className={`p-6 ${contentClassName}`}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
