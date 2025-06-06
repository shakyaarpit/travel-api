import mongoose from "mongoose";

let bookingSchema = new mongoose.Schema({
    name:String,
    mobile_no:Number,
    from:String,
    to:String,
    day:Number,
    adult:Number
})

let Booking = new mongoose.model("Booking",bookingSchema)
export default Booking;