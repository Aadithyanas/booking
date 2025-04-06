import Seat from '../models/Seat.js';
import User from '../models/User.js';

// GET all seats
export const getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find().sort({ seatNumber: 1 });
    res.json(seats);
  } catch (err) {
    console.error('Error fetching seats:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST book seats
export const bookSeats = async (req, res) => {
  const { seatNumbers } = req.body;
  const userId = req.user.id;

  if (!Array.isArray(seatNumbers) || seatNumbers.length === 0) {
    return res.status(400).json({ message: 'No seat numbers provided' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const seats = await Seat.find({ seatNumber: { $in: seatNumbers } });

    const alreadyBooked = seats.filter(seat => seat.isBooked);
    if (alreadyBooked.length > 0) {
      return res.status(409).json({
        message: 'Some seats are already booked',
        alreadyBooked: alreadyBooked.map(s => s.seatNumber)
      });
    }

    await Promise.all(
      seats.map(seat => {
        seat.isBooked = true;
        seat.bookedBy = user._id;
        return seat.save();
      })
    );

    res.status(200).json({ message: 'Seats booked successfully' });
  } catch (err) {
    console.error('Error booking seats:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET user booked seats
export const getUserBookedSeats = async (req, res) => {
  const userId = req.user.id;

  try {
    const seats = await Seat.find({ bookedBy: userId }).sort({ seatNumber: 1 });
    res.status(200).json({ seats });
  } catch (err) {
    console.error('Error fetching user booked seats:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
