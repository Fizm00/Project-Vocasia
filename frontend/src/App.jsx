import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ProfilePage from "./pages/ProfilePage.jsx";
import Contact from "./pages/Contact.jsx";
import Notification from "./pages/Notification.jsx";
import TransactionsHistory from "./pages/TransactionsHistory.jsx";
//Owner Page
import RentalApproval from "./components/RentalPageOwner/RentalApproval.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Properties from "./pages/Properties.jsx";
import Review from "./pages/Review.jsx";
// Backend
import ProtectedRoute from "./services/ProtectedRoute.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<SearchResultPage />} />

          {/* auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/logout" />
          <Route path="/success" element={<SuccessBook />} />
          <Route
            path="/detail/:id"
            element={<DetailPage />}
            key="detail"
          ></Route>
          <Route
            path="/riwayat-sewa"
            element={
              <ProtectedRoute>
                <RentalHistory />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
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
          <Route path="/success-book" element={<SuccessBook />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/notification" element={<Notification />} />
          <Route
            path="/transactions-history"
            element={<TransactionsHistory />}
          />
          {/* Route Owner Page */}
          <Route path="/rental-approval" element={<RentalApproval />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/properties" element={<Properties />} />
          <Route
            path="/property/:id"
            key={"property"}
            element={<DetailPage />}
          />
          <Route path="/reviews" element={<Review />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
