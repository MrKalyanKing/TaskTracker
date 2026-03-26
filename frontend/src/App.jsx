import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom"
import DashboardPage from './pages/DashboardPage'
import Analytics from './components/Analytics/Analytics'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path='/analytics' element={<Analytics />} />
      </Routes>
    </div>
  )
}

export default App