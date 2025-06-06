import mongoose from "mongoose";

let planSchema = new mongoose.Schema({
  img: String,
  vehicle: String,
  from: String,
  to: String,
  day: Number,
  price: Number,
  detail: String,
  tripType:String
});

let Plan = new mongoose.model("Plan", planSchema);
export default Plan;
