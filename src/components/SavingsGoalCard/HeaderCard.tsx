type HeaderCardProps = {} & React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement>
const HeaderCard = ({ ...props }: HeaderCardProps) => {
  return (
    <div className='flex items-center mb-6' {...props}>
      <div className='flex items-center justify-center mr-4 size-16'>
        <img src='/icon-home.png' alt='Home Icon' className='w-full h-full text-blue-600' />
      </div>
      <div>
        <h2 className='text-xl font-medium md:text-2xl text-blueGray900 font-rubik'>Buy a house</h2>
        <p className='text-sm md:text-base text-blueGray400'>Saving goal</p>
      </div>
    </div>
  )
}

export default HeaderCard
