import mongoose from "mongoose";
import User from "./modles/userSchema.js";
import Blog from "./modles/blogSchema.js";
import Plan from "./modles/planSchema.js";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb+srv://arpitshakya9956:07112000@travel.v33sg8u.mongodb.net/travelNewDB");
}

// let plan1 = new Plan({
//   img:"https://www.indiacarnews.com/wp-content/uploads/2019/12/Jeep-7-seater-SUV-In-India.jpg",
//   vehicle:"SUVs / 7 Sheeter",
//   from:"Delhi / Delhi NCR",
//   to:"Shimla",
//   day:5,
//   price:5999,
// detail: `
// day - 1 = kullu
// day - 2 = Manali
// day - 3 = Pahadiya
// day - 4 = Galiya
// day - 5 = Bhutiya
// `
// })

plan1.save().then((res)=>{
  console.log(res);
})
