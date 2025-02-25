import { Route, Routes } from 'react-router'
import { lazy } from 'react'
import LayoutPrimary from './layouts/LayoutPrimary'
const Home = lazy(() => import('@/pages/Home'))
function App() {
  return (
    <Routes>
      <Route path='/' element={<LayoutPrimary />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
