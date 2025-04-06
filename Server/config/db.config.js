import mongoose from "mongoose";

 export const MONGODB=async()=>{
    try {
        await mongoose.connect("mongodb+srv://aadithyanmerin:AdithyanMerin@cluster0.syz6u.mongodb.net/TrainBooking")
        console.log("Database Connected Successfully ✅")
    } catch (error) {
        console.log("Not Connected to DB ❌")
    }
}