import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import Otp from "./pages/Otp";
import Contact from "./pages/Contact.jsx";
import Notification from "./pages/Notification.jsx";
import TransactionsHistory from "./pages/TransactionsHistory.jsx";
import AddReview from "./pages/AddReviewPage.jsx";
//Owner Page
import RentalApproval from "./components/RentalPageOwner/RentalApproval.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Properties from "./pages/Properties.jsx";
import Review from "./pages/Review.jsx";
import AddKost from "./pages/AddKost.jsx";
import Verification from "./pages/Verification.jsx";
// Backend
import ProtectedRoute from "./services/ProtectedRoute.jsx";
import OwnerProtectedRoute from "./services/OwnerProtectedRoute.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<SearchResultPage />} />

          {/* auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="otp" element={<Otp />} />
          <Route path="/logout" />
          <Route path="/success-book/:id" element={
              <ProtectedRoute>
                <SuccessBook />
              </ProtectedRoute>
            }
          />
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
            path="/payment/:id"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          /> */}
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
          <Route path="/success-book/:id" element={<SuccessBook />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/notification" element={<Notification />} />
          <Route
            path="/transactions-history"
            element={<TransactionsHistory />}
          />
          <Route path="/add-review" element={<AddReview />} />
          {/* Route Owner Page */}
          <Route path="/rental-approval" element={<RentalApproval />} />
          <Route path="dashboard" element={
            <OwnerProtectedRoute>
              <Dashboard />
            </OwnerProtectedRoute>
          } />
          <Route path="/properties" element={
            <OwnerProtectedRoute>
              <Properties />
            </OwnerProtectedRoute>
          } />
          <Route path="/reviews" element={
            <OwnerProtectedRoute>
              <Review />
            </OwnerProtectedRoute>
          } />
          <Route path="/add-kost" element={
            <OwnerProtectedRoute>
              <AddKost />
            </OwnerProtectedRoute>
          } />
          <Route path="/verification" element={<Verification />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
