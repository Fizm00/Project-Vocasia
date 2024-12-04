import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import './index.css';
import Register from './pages/Register.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SearchResultPage from './pages/SearchResultPage.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchResultPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
