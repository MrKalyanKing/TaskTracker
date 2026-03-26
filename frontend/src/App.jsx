import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom"
import DashboardPage from './pages/DashboardPage'
import Analytics from './components/Analytics/Analytics'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />

        <Route path='/analytics' element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } />

      </Routes>
    </div>
  )
}

export default App