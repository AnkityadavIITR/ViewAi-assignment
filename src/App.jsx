import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Table from './pages/Table'
import { Toaster } from 'react-hot-toast';

export const server=`https://randomuser.me/api`;
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Table/>} />
      </Routes>
      <Toaster></Toaster>
    </Router>
  )
}

export default App
