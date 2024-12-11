import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import "./App.css";
import "./index.css";
import Register from "./pages/Register.jsx";

import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import SearchResultPage from "./pages/SearchResultPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import RentalHistory from "./pages/RentalHistory.jsx";
import About from "./pages/About.jsx";
import Payment from "./pages/Payment.jsx";
import Booking from "./pages/Booking.jsx";
import SuccessBook from "./pages/SuccessBook.jsx";
import ProtectedRoute from "./services/ProtectedRoute.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/success-book" element={<SuccessBook />} />
          <Route
            path="/detail/:id"
            element={<DetailPage />}
            key="detail"
          ></Route>

          {/* ROUTE YANG MEMBUTUHKAN TOKEN (AUTH) */}
          <Route
            path="/riwayat-sewa"
            element={
              <ProtectedRoute>
                <RentalHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/:id"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
