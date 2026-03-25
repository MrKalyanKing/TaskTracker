import React from 'react'
import Home from './pages/Home'
import {Routes,Route} from "react-router-dom"
import DashboardPage from './pages/DashboardPage'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<DashboardPage/>}/>
      </Routes>
    </div>
  )
}

export default App