import SavingsGoalCard from '@/components/SavingsGoalCard/SavingsGoalCard'
import LayoutPrimary from '@/layouts/LayoutPrimary'
const Home = () => {
  return (
    <LayoutPrimary>
      <div className='max-w-[560px] mx-auto w-full'>
        <h1 className='mt-8 mb-6 text-lg text-center md:text-xl md:mt-12 md:mb-6 text-brandColorPrimary'>
          Let's plan your <span className='font-semibold '>saving goal</span>
        </h1>
        <SavingsGoalCard />
      </div>
    </LayoutPrimary>
  )
}

export default Home
