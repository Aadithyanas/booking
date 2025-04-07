import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function BookingPage() {
  const { user, logout } = useAuth();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const {
    bookedSeats,
    userBookedSeats,
    selectedSeats,
    selectSeat,
    fetchBookedSeats,
    fetchUserBookedSeats,
    clearSelectedSeats,
  } = useBooking();

  const [seatCount, setSeatCount] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScreen, setShowScreen] = useState(true);

  useEffect(() => {
    fetchBookedSeats();
    if (token) {
      fetchUserBookedSeats(token);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const autoSelectSeats = (count) => {
    if (count > 7) return false;

    const totalRows = 12; // 11 full rows + 1 short row
    const totalCols = 7;
    const lastRowExtraSeats = 3;

    const allSeats = [];
    let seatNumber = 1;

    for (let row = 0; row < totalRows; row++) {
      const cols = row === 11 ? lastRowExtraSeats : totalCols;
      const rowSeats = [];
      for (let col = 0; col < cols; col++) {
        rowSeats.push(seatNumber++);
      }
      allSeats.push(rowSeats);
    }

    // ROW-WISE PRIORITY
    for (let row = 0; row < totalRows; row++) {
      const rowSeats = allSeats[row];
      for (let i = 0; i <= rowSeats.length - count; i++) {
        const group = rowSeats.slice(i, i + count);
        if (group.every((s) => !bookedSeats.includes(s))) {
          clearSelectedSeats();
          group.forEach((s) => selectSeat(s));
          return true;
        }
      }
    }

    // COLUMN-WISE FALLBACK
    for (let col = 0; col < totalCols; col++) {
      let temp = [];
      for (let row = 0; row < totalRows; row++) {
        const seat = allSeats[row][col];
        if (!seat || bookedSeats.includes(seat)) {
          temp = [];
          continue;
        }
        temp.push(seat);
        if (temp.length === count) {
          clearSelectedSeats();
          temp.forEach((s) => selectSeat(s));
          return true;
        }
      }
    }

    return false;
  };

  const handleAutoSelect = () => {
    const count = parseInt(seatCount, 10);
    if (isNaN(count) || count <= 0) {
      toast.error('Please enter a valid number of seats');
      return;
    }
    if (count > 7) {
      toast.error('Maximum 7 seats allowed');
      return;
    }

    const success = autoSelectSeats(count);
    if (!success) {
      toast.error('Could not find enough available seats');
    } else {
      toast.success(`${count} seats auto-selected!`);
    }
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://booking-rqrh.onrender.com/auth/seat/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ seatNumbers: selectedSeats }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409 && data.alreadyBooked) {
          toast.error(`Already booked: ${data.alreadyBooked.join(', ')}`);
        } else {
          throw new Error(data.message || 'Booking failed');
        }
        return;
      }

      toast.success('Seats booked successfully!');
      await fetchBookedSeats();
      await fetchUserBookedSeats(token);
      clearSelectedSeats();
      setSeatCount('');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const renderSeat = (seatNumber) => {
    const isBooked = bookedSeats.includes(seatNumber);
    const isUserBooked = userBookedSeats.includes(seatNumber);
    const isSelected = selectedSeats.includes(seatNumber);

    let bgColor = 'bg-green-500';
    let hoverEffect = 'hover:scale-110 hover:bg-green-600';
    
    if (isUserBooked) {
      bgColor = 'bg-yellow-500';
      hoverEffect = '';
    }
    if (isBooked && !isUserBooked) {
      bgColor = 'bg-red-500';
      hoverEffect = '';
    }
    if (isSelected) {
      bgColor = 'bg-blue-500';
      hoverEffect = 'hover:bg-blue-600';
    }

    return (
      <motion.button
        key={seatNumber}
        onClick={() => !isBooked && selectSeat(seatNumber)}
        disabled={isBooked}
        whileHover={!isBooked ? { scale: 1.1 } : {}}
        whileTap={!isBooked ? { scale: 0.95 } : {}}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: seatNumber * 0.005 }}
        className={`w-12 h-12 m-1 rounded-lg ${bgColor} text-white font-bold shadow-md
          ${isBooked ? 'opacity-70 cursor-not-allowed' : hoverEffect}
          transition-all duration-300`}
      >
        {seatNumber}
      </motion.button>
    );
  };

  const renderSeats = () => {
    const seats = [];
    let seatNumber = 1;

    for (let row = 0; row < 11; row++) {
      const rowSeats = [];
      for (let seat = 0; seat < 7; seat++) {
        rowSeats.push(renderSeat(seatNumber++));
      }
      seats.push(
        <div key={row} className="flex justify-center space-x-2 mb-2">
          {rowSeats}
        </div>
      );
    }

    const lastRow = [];
    for (let seat = 0; seat < 3; seat++) {
      lastRow.push(renderSeat(seatNumber++));
    }

    seats.push(
      <div key="last-row" className="flex justify-center space-x-2 mb-2">
        {lastRow}
      </div>
    );

    return seats;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-8">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className=" mt-[5rem] text-center text-3xl font-bold text-indigo-800"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome, {user?.username}!
          </motion.h1>
          
        </div>

        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="relative mb-12">
            <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">Select Your Seats</h2>
            
            {showScreen && (
              <motion.div 
                className="w-3/4 h-4 bg-gray-300 rounded-full mx-auto mb-12"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="text-center text-gray-500 text-sm mt-2">Screen</div>
              </motion.div>
            )}
          </div>

          <motion.div 
            className="mb-6 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div> Available
            </span>
            <span className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div> Selected
            </span>
            <span className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div> Your Bookings
            </span>
            <span className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div> Booked
            </span>
          </motion.div>

          <motion.div 
            className="mb-6 flex flex-wrap items-center justify-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="relative">
              <input
                type="number"
                min="1"
                max="7"
                value={seatCount}
                onChange={(e) => setSeatCount(e.target.value)}
                placeholder="Number of seats"
                className="px-4 py-2 border border-gray-300 rounded-lg w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />
              <span className="text-xs text-gray-500 absolute -bottom-5 left-0">Max: 7</span>
            </div>
            <motion.button
              onClick={handleAutoSelect}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
            >
              Auto Select
            </motion.button>
          </motion.div>

          <motion.div 
            className="mb-6 bg-gray-50 p-3 rounded-lg text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-gray-700">
              Selected Seats: <span className="font-bold text-indigo-600">{selectedSeats.join(', ') || 'None'}</span>
            </p>
            {selectedSeats.length > 7 && (
              <motion.p 
                className="text-red-500 mt-1"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Maximum 7 seats allowed!
              </motion.p>
            )}
          </motion.div>

          <div className="mb-8 overflow-x-auto p-4">{renderSeats()}</div>

          <div className="flex justify-center mt-8">
            <motion.button
              onClick={handleBooking}
              disabled={selectedSeats.length === 0 || loading}
              whileHover={selectedSeats.length > 0 && !loading ? { scale: 1.05 } : {}}
              whileTap={selectedSeats.length > 0 && !loading ? { scale: 0.95 } : {}}
              className={`px-8 py-3 rounded-lg text-white font-bold shadow-lg 
                ${selectedSeats.length === 0 || loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'}
                transition-all duration-300`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Booking...
                </span>
              ) : 'Book Now'}
            </motion.button>
          </div>
        </motion.div>
        
        <motion.p 
          className="text-center text-gray-500 mt-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          &copy; {new Date().getFullYear()} Seat Booking System
        </motion.p>
      </motion.div>
    </div>
  );
}