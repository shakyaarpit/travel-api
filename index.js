import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./modles/userSchema.js";
import Blog from "./modles/blogSchema.js";
import Plan from "./modles/planSchema.js";
import Booking from "./modles/bookingSchema.js";
import jwt from "jsonwebtoken";
import { LocalStorage }  from "node-localstorage"
let PORT = PORT || 8080
const app = express();
app.use(cors());
app.use(express.json());

//connect with mongoDb
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/travelData");
}

//letning port
app.listen(PORT, () => {
  console.log(`port listning on ${PORT}` );
});

//signin & login router

app.post("/signin", async (req, res) => {
  try {
    let { email } = req.body;
    let newEmail = await User.findOne({ email: email });
    if (newEmail) {
      if (newEmail.email == email) {
        res.json("allready");
      }
    }
    let newUser = await new User(req.body);
    newUser.save().then(() => {
      res.json();
    });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let newEmail = await User.findOne({ email: email });
  if (newEmail) {
    const jwtToken = jwt.sign(
      { email: newEmail.email, _id: newEmail._id },
      "secret",
      { expiresIn: "24h" }
    );
    if (newEmail.password == password) {
      res.json({ data: "success", newEmail: newEmail, jwtToken: jwtToken });
    } else {
      res.json("wrongPass");
    }
  } else {
    res.json("invalid");
  }
});

app.post("/changePass", async (req, res) => {
  let { password, email } = req.body;
  const newEmail = await User.findOneAndUpdate(
    { email: email },
    { password: password },
    {
      returnOriginal: false,
    }
  );
  res.json(newEmail);
});

//blog router
app.get("/blog", async (req, res) => {
  let allBlog = await Blog.find();
  res.json(allBlog);
});
app.get("/blog/blogInDetail/:id", async (req, res) => {
  let { id } = req.params;
  let newBlog = await Blog.findById({ _id: id });
  res.json(newBlog);
});

app.get("/getUser/:id", (req, res) => {
  let id = req.params.id;

  Blog.findById({ _id: id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.put("/blog/updateBlog/:id", async (req, res) => {
  let { id } = req.params;
  let { img, title, detail } = req.body;
  let newBlog = await Blog.findByIdAndUpdate(
    { _id: id },
    { img: img, title: title, detail: detail }
  );
  res.json("updated");
});

app.post("/createBlog", async (req, res) => {
  let newBlog = await new Blog(req.body);
  newBlog.save().then(() => {
    res.json("success");
  });
});

app.delete("/blog/deleteBlog/:id", async (req, res) => {
  let { id } = req.params;
  let msg = await Blog.findByIdAndDelete({ _id: id });
  res.json("delete");
});

//plan details router
app.get("/destination", async (req, res) => {
  let allPlace = await Plan.find();
  res.json(allPlace);
});

app.get("/getPlace/:id", async (req, res) => {
  let { id } = req.params;
  let newData = await Plan.findById({ _id: id });
  res.json(newData);
});
app.put("/updatePlace/:id", async (req, res) => {
  let { id } = req.params;
  let { tripType, img, vehicle, from, to, day, price, detail } = req.body;
  let newBlog = await Plan.findByIdAndUpdate(
    { _id: id },
    {
      tripType: tripType,
      img: img,
      vehicle: vehicle,
      from: from,
      to: to,
      day: day,
      price: price,
      detail: detail,
    }
  );
  res.json("updated");
});
app.post("/addNewPlace", async (req, res) => {
  let placeInfo = await new Plan(req.body);
  placeInfo.save().then((result) => {
    res.json("add");
  });
});

app.delete("/deletePlace/:id", async (req, res) => {
  let { id } = req.params;
  let deteleOne = await Plan.findByIdAndDelete({ _id: id });
  res.json("delete");
});

//Booking router
app.get("/bookingDetail", async (req, res) => {
  let allBooking = await Booking.find();
  res.json(allBooking);
});
app.get("/getBooking/:id", async (req, res) => {
  let { id } = req.params;
  let bookingFind = await Booking.findById({ _id: id });
  res.json(bookingFind);
});
app.patch("/bookingUpdate/:id", async (req, res) => {
  let { id } = req.params;
  let { from, to, day , adult } = req.body;
  let newBooking = await Booking.findByIdAndUpdate(
    { _id: id },
    { from: from, to: to, day: day,adult:adult }
  );
  res.json("updated");
});
app.post("/userDetail", async (req, res) => {
  let newUser = await new Booking(req.body);
  newUser.save().then((result) => {
    res.json("add");
  });
});
app.delete("/bookingDelete/:id", async (req, res) => {
  let { id } = req.params;
  let bookingDel = await Booking.findByIdAndDelete({ _id: id });
  res.json("delete");
});
