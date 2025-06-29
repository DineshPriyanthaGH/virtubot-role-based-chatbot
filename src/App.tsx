import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './services/AuthProvider'
import LandingPage from './pages/LandingPage'
import SignInPage from './pages/sign-in'
import SignUpPage from './pages/sign-up'
import ChatPage from './pages/chatpage'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/chatpage" element={<ChatPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
