import { HTMLAttributes, PropsWithChildren } from 'react'

type LayoutPrimaryProps = {} & PropsWithChildren & HTMLAttributes<HTMLElement>
const LayoutPrimary = ({ children, ...props }: LayoutPrimaryProps) => {
  return (
    <div className='w-full min-h-screen bg-blueGray10' {...props}>
      <header className='w-full bg-neutralWhite p-4 md:px-[54px] md:py-[24px]'>
        <img src='/logo.png' alt='' className='w-[75px] h-6 md:w-[100px] md:h-[32px] object-cover' />
      </header>
      {children}
    </div>
  )
}

export default LayoutPrimary
