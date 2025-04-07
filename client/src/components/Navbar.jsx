import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleBookingClick = () => {
    if (user) {
      navigate('/booking');
    } else {
      toast.error('Please login to continue');
      navigate('/login', { state: { fromBooking: true } });
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">TrainBooker</div>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/">Home</Link>
            <button className="nav-btn-link" onClick={handleBookingClick}>
              Booking
            </button>
            <button onClick={handleLogout} className='text-red bg-red-500 p-1 px-2 rounded-lg' >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <button className="nav-btn-link" onClick={handleBookingClick}>
              Booking
            </button>
            <Link to="/signup">SignUp</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
