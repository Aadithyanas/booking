import express from "express";
import {MONGODB} from './config/db.config.js'

import bookingRouter from "./routes/bookingRoutes.js";
import cors from "cors"
import router from "./routes/authRoutes.js";
import mongoose from "mongoose";
import Seat from "./models/Seat.js";

const app = express()
app.use(express.json())
app.use(cors())

MONGODB()

app.use("/auth" , router)
app.use("/auth", bookingRouter)



const createSeats = async () => {
    try {
      await mongoose.connect("mongodb+srv://aadithyanmerin:AdithyanMerin@cluster0.syz6u.mongodb.net/TrainBooking");
  
      const existingSeats = await Seat.countDocuments();
      if (existingSeats > 0) {
        console.log('Seats already exist');
        return;
      }
  
      const seatData = [];
      for (let i = 1; i <= 80; i++) {
        seatData.push({ seatNumber: i, isBooked: false });
      }
  
      await Seat.insertMany(seatData);
      console.log('Seats initialized successfully');
      process.exit();
    } catch (err) {
      console.error('Error initializing seats:', err);
      process.exit(1);
    }
  };
  
//   createSeats()
const PORT=3000;
app.listen(PORT,()=>console.log("server Runing now"))