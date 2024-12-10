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
import RentalHistory from './pages/RentalHistory.jsx';
import About from './pages/About.jsx';
import Payment from './pages/Payment.jsx';
import Booking from './pages/Booking.jsx';
import SuccessBook from './pages/SuccessBook.jsx'; 
import Contact from './pages/Contact.jsx';

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
          <Route path="/riwayat-sewa" element={<RentalHistory />} />
          <Route path="/about" element={<About />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/success-book" element={<SuccessBook />} /> 
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;