import { MODAL_MESSAGES } from '@/utils/constants'
import { formatCurrency, formatDisplayValue } from '@/utils/currency'
import { formatMonth, formatYear } from '@/utils/date'
import React from 'react'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
type ConfirmModalProps = {
  isOpen?: boolean
  toggleModal: () => void
  amount: number
  monthlyAmount: number
  totalMonths: number
  reachDate: Date
}
const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen = false,
  toggleModal,
  amount,
  monthlyAmount,
  totalMonths,
  reachDate
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => toggleModal()} className='max-w-lg' contentClassName='space-y-4'>
      <div className='w-full max-w-md bg-white rounded-lg'>
        <div className='p-6 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <h3 id='modal-title' className='text-xl font-semibold text-gray-900' data-testid='modal-title'>
              {MODAL_MESSAGES.success}
            </h3>
            <div className=''></div>
          </div>
        </div>

        <div className='p-6 space-y-4'>
          <p className='text-gray-700' data-testid='modal-save-message'>
            {MODAL_MESSAGES.save}{' '}
            <strong data-testid='modal-total-amount' className='break-all'>
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
            <strong data-testid='modal-monthly-amount' className='break-all'>
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
          <Button className='mx-auto max-w-80' fullWidth onClick={toggleModal} data-testid='modal-close-button-footer'>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
