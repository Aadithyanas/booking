import express from 'express';
import { getAllSeats, bookSeats, getUserBookedSeats } from '../controllers/bookingController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/seats', getAllSeats);
router.post('/seat/book', verifyToken, bookSeats);
router.get('/seat/user-bookings', verifyToken, getUserBookedSeats);

export default router;