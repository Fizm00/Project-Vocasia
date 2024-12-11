import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getLogginedInUser from "./utils/authHelper.js";
import ProtectedRoute from "./components/Protected/ProtectedRoute.jsx";
import "./App.css";
import "./index.css";
import Register from "./pages/Register.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import SearchResultPage from "./pages/SearchResultPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import RentalHistory from "./pages/RentalHistory.jsx";
import About from "./pages/About.jsx";
import Payment from "./pages/Payment.jsx";
import Booking from "./pages/Booking.jsx";
import SuccessBook from "./pages/SuccessBook.jsx";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const logginedInUser = getLogginedInUser();
    if (logginedInUser) {
      setUser(logginedInUser);
    }
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route
            path="/login"
            element={
              <ProtectedRoute user={user}>
                <LoginPage />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/detail/:id"
            element={<DetailPage />}
            key="detail"
          ></Route>
          {/* <Route path="/riwayat-sewa" element={<RentalHistory />} /> */}
          <Route
            path="/riwayat-sewa"
            element={
              <ProtectedRoute user={user}>
                <RentalHistory />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/success-book" element={<SuccessBook />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
