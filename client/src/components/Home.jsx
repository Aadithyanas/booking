import { useNavigate } from 'react-router-dom';
import { FaTrain, FaCalendarAlt, FaMapMarkerAlt, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import '../App.css';

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBookingClick = () => {
    if (user) {
      navigate('/booking');
    } else {
      toast.error('Please login to continue');
      navigate('/login', { state: { fromBooking: true } });
    }
  };

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">TrainBooker</div>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <button className="nav-btn-link" onClick={handleBookingClick}>
            Booking
          </button>
          <Link to="/signup">SignUp</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Book Your Train Journey</h1>
          <p>Travel comfortably with the best prices guaranteed</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">
            <FaTrain />
          </div>
          <h3>Wide Network</h3>
          <p>Access to thousands of routes across the country</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <FaCalendarAlt />
          </div>
          <h3>Easy Booking</h3>
          <p>Simple and fast booking process</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <FaMapMarkerAlt />
          </div>
          <h3>Live Tracking</h3>
          <p>Real-time updates on train location</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <FaLock />
          </div>
          <h3>Secure Payments</h3>
          <p>Safe and encrypted payment processing</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
