import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/home"
            element={<ProtectedRoutes>
              <Home />
            </ProtectedRoutes>}>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

// react router dom
// multi page
// cookies
// auth
// abcd -> login <- abcd -> login
// protected routes
// all done