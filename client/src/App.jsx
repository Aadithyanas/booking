import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import BookingPage from './components/BookingPage';
import Home from './components/Home'; // 👈 Import your Landing Page
import { useAuth } from './context/AuthContext';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
     
      <AuthProvider>
      <Navbar/>
        <BookingProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Home />} /> {/* 👈 Landing Page */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/booking"
              element={
                <PrivateRoute>
                  <BookingPage />
                </PrivateRoute>
              }
            />
            {/* Optional fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BookingProvider>
      </AuthProvider>
      <Footer/>
    </Router>
  );
}

export default App;
