import React, { useEffect, useRef, KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatMonth, formatYear, isDateInFuture, getNextMonth, getPreviousMonth } from '@/utils/date'
import classNames from 'classnames'
type DateSelectorProps = {
  selectedDate: Date
  onChangeDateSelector: (date: Date) => void
} & React.HTMLAttributes<HTMLDivElement>
const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onChangeDateSelector, ...props }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!selectedDate) {
      const nextMonth = getNextMonth(new Date())
      onChangeDateSelector(nextMonth)
    }
  }, [selectedDate, onChangeDateSelector])

  const handlePreviousMonth = () => {
    const previousMonth = getPreviousMonth(selectedDate)
    if (isDateInFuture(previousMonth)) {
      onChangeDateSelector(previousMonth)
    }
  }

  const handleNextMonth = () => {
    const nextMonth = getNextMonth(selectedDate)
    onChangeDateSelector(nextMonth)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowLeft':
        handlePreviousMonth()
        break
      case 'ArrowRight':
        handleNextMonth()
        break
      default:
        break
    }
  }
  const handleContainerClick = () => {
    if (containerRef.current) {
      containerRef.current.focus()
    }
  }
  return (
    <div
      {...props}
      ref={containerRef}
      tabIndex={0} // Thêm tabIndex để element có thể focus được
      onClick={handleContainerClick} // Thêm onClick handler để focus khi click
      onKeyDown={handleKeyDown}
      className={classNames('input-primary', props.className)}
    >
      <button
        type='button'
        onClick={handlePreviousMonth}
        className='flex items-center justify-center w-12 transition-colors hover:bg-gray-50'
      >
        <ChevronLeft className='w-6 h-6 text-blueGray300' />
      </button>

      <div className='flex flex-col items-center justify-center flex-1 text-blueGray900'>
        <div className='text-sm font-semibold md:text-base'>{formatMonth(selectedDate)}</div>
        <div className='text-sm text-blueGray400'>{formatYear(selectedDate)}</div>
      </div>

      <button
        type='button'
        onClick={handleNextMonth}
        className='flex items-center justify-center w-12 transition-colors hover:bg-gray-50'
      >
        <ChevronRight className='w-5 h-5 text-blueGray300' />
      </button>
    </div>
  )
}

export default DateSelector
