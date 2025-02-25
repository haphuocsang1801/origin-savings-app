import React, { useEffect } from 'react'
import { X } from 'lucide-react'
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

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50'
      onClick={handleOverlayClick}
    >
      <div className='w-full max-w-md bg-white rounded-lg'>
        <div className='p-6 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <h3 id='modal-title' className='text-xl font-semibold text-gray-900'>
              {MODAL_MESSAGES.success}
            </h3>
            <button
              onClick={onClose}
              className='text-gray-400 transition-colors hover:text-gray-500'
              aria-label='Close modal'
            >
              <X className='w-6 h-6' />
            </button>
          </div>
        </div>

        <div className='p-6 space-y-4'>
          <p className='text-gray-700'>
            {MODAL_MESSAGES.save}{' '}
            <strong>
              $
              {formatDisplayValue(
                formatCurrency(amount, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              )}
            </strong>{' '}
            by{' '}
            <strong>
              {formatMonth(reachDate)} {formatYear(reachDate)}
            </strong>
            .
          </p>
          <p className='text-gray-700'>
            {MODAL_MESSAGES.monthly}{' '}
            <strong>
              $
              {formatDisplayValue(
                formatCurrency(monthlyAmount, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              )}
            </strong>{' '}
            for <strong>{totalMonths}</strong> month
            {totalMonths !== 1 ? 's' : ''}.
          </p>
        </div>

        <div className='p-6 border-t border-gray-200'>
          <Button className='mx-auto max-w-80' fullWidth onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
