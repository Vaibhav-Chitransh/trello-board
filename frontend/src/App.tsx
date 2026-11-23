import { BrowserRouter, Routes, Route } from 'react-router';
import Dashboard from './screens/Dashboard';
import Board from './screens/Board';
import Signin from './screens/Signin';
import Signup from './screens/Signup';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/board/:boardId' element={<Board />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App