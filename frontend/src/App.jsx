import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import './App.css'
import './index.css'
import Register from './pages/Register.jsx';
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;