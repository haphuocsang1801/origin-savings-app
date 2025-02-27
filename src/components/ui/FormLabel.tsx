import classNames from 'classnames'
import { PropsWithChildren } from 'react'

type FormLabelProps = {
  label: string
  className?: string
  htmlFor?: string
  'data-testid'?: string
} & PropsWithChildren

const FormLabel = ({
  label,
  children,
  className = '',
  htmlFor = '',
  'data-testid': dataTestId = 'form-label'
}: FormLabelProps) => {
  return (
    <div className={classNames('flex flex-col items-start gap-1', className)} data-testid={dataTestId}>
      <label className='block text-xs font-normal cursor-pointer md:text-sm text-blueGray900' htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  )
}

export default FormLabel
