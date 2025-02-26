import SavingsGoalCard from '@/components/SavingsGoalCard/SavingsGoalCard'
import { useEffect } from 'react'
const Home = () => {
  //set title meta
  useEffect(() => {
    document.title = 'Savings Goal'
  }, [])
  return (
    <div className='max-w-[560px] mx-auto w-full'>
      <h1 className='mt-8 mb-6 text-lg text-center md:text-xl md:mt-12 md:mb-6 text-brandColorPrimary'>
        Let's plan your <span className='font-semibold '>saving goal</span>
      </h1>
      <SavingsGoalCard />
    </div>
  )
}

export default Home
