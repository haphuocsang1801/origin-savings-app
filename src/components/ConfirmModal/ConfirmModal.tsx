import React, { useEffect } from 'react'
import { formatMonth, formatYear } from '@/utils/date'
import { formatCurrency, formatDisplayValue } from '@/utils/currency'
import { MODAL_MESSAGES } from '@/utils/constants'
import Button from '../ui/Button'
type ConfirmModalProps = {
  onClose: () => void
  amount: number
  monthlyAmount: number
  totalMonths: number
  reachDate: Date
}
const ConfirmModal: React.FC<ConfirmModalProps> = ({ onClose, amount, monthlyAmount, totalMonths, reachDate }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50'
      onClick={handleOverlayClick}
      data-testid='modal-confirm-modal-overlay'
    >
      <div className='w-full max-w-md bg-white rounded-lg' data-testid='modal-confirm-modal-container'>
        <div className='p-6 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <h3 id='modal-title' className='text-xl font-semibold text-gray-900' data-testid='modal-title'>
              {MODAL_MESSAGES.success}
            </h3>
            <button
              onClick={onClose}
              className='text-gray-400 transition-colors hover:text-gray-500'
              aria-label='Close modal'
              data-testid='modal-close-modal-button'
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
          </div>
        </div>

        <div className='p-6 space-y-4'>
          <p className='text-gray-700' data-testid='modal-save-message'>
            {MODAL_MESSAGES.save}{' '}
            <strong data-testid='modal-total-amount'>
              {formatDisplayValue(
                formatCurrency(amount, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  currency: 'USD',
                  style: 'currency'
                })
              )}
            </strong>{' '}
            by{' '}
            <strong data-testid='modal-goal-date'>
              {formatMonth(reachDate)} {formatYear(reachDate)}
            </strong>
            .
          </p>
          <p className='text-gray-700' data-testid='modal-monthly-message'>
            {MODAL_MESSAGES.monthly}{' '}
            <strong data-testid='modal-monthly-amount'>
              {formatDisplayValue(
                formatCurrency(monthlyAmount, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  currency: 'USD',
                  style: 'currency'
                })
              )}
            </strong>{' '}
            for <strong data-testid='modal-total-months'>{totalMonths}</strong> month
            {totalMonths !== 1 ? 's' : ''}.
          </p>
        </div>

        <div className='p-6 border-t border-gray-200'>
          <Button className='mx-auto max-w-80' fullWidth onClick={onClose} data-testid='modal-close-button'>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
