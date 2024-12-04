import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import './index.css';
import Register from './pages/Register.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ForgotPassword from './pages/ForgotPassword';
import SearchResultPage from './pages/SearchResultPage.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
