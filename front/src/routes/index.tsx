import { Routes, Route } from 'react-router-dom'

import Home from './Home'
import Auth from './Auth'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App
