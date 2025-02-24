import { Route, Routes } from 'react-router'
import { lazy } from 'react'
const Home = lazy(() => import('@/pages/Home'))
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default App
