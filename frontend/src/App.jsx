import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import './index.css';
import Register from './pages/Register.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import SearchResultPage from './pages/SearchResultPage.jsx';
import DetailPage from './pages/DetailPage.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/detail/:id" element={<DetailPage />} key="detail"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;