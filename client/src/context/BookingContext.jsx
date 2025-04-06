import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();
export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookedSeats, setBookedSeats] = useState([]);
  const [userBookedSeats, setUserBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const fetchBookedSeats = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/seats');
      const data = await res.json();
      const booked = data.filter(seat => seat.isBooked).map(seat => seat.seatNumber);
      setBookedSeats(booked);
    } catch (err) {
      console.error('Failed to fetch booked seats:', err);
    }
  };

  const fetchUserBookedSeats = async (token) => {
    try {
      const res = await fetch('http://localhost:3000/auth/seat/user-bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        const seatNumbers = data.seats.map(seat => seat.seatNumber);
        setUserBookedSeats(seatNumbers);
        setBookedSeats(prev => Array.from(new Set([...prev, ...seatNumbers])));
      }
    } catch (err) {
      console.error('Failed to fetch user booked seats:', err);
    }
  };

  const selectSeat = (seatNumber) => {
    setSelectedSeats(prev =>
      prev.includes(seatNumber) ? prev.filter(s => s !== seatNumber) : [...prev, seatNumber]
    );
  };

  const autoSelectSeats = (count) => {
    const available = [];
    for (let i = 1; i <= 80; i++) {
      if (!bookedSeats.includes(i) && !selectedSeats.includes(i)) {
        available.push(i);
        if (available.length === count) break;
      }
    }
    if (available.length < count) return false;
    setSelectedSeats(available);
    return true;
  };

  const clearSelectedSeats = () => setSelectedSeats([]);

  return (
    <BookingContext.Provider
      value={{
        bookedSeats,
        userBookedSeats,
        selectedSeats,
        selectSeat,
        autoSelectSeats,
        fetchBookedSeats,
        fetchUserBookedSeats,
        clearSelectedSeats,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};