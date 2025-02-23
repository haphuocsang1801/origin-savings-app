import { Route, Routes } from 'react-router'
import Test from './components/Test'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Test />} />
    </Routes>
  )
}

export default App
