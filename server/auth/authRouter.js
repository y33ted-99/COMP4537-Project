const express = require("express");
const dotenv = require("dotenv");
const mongodb = require("mongodb");
const mongoose = require("mongoose");

// mongodb modles
const User = require('../models/user');
const ApiToken = require('../models/apiToken');
const ApiCall = require('../models/apiCall');

dotenv.config({ path: require("path").resolve(__dirname, "../.env") });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const passwordManager = require("./bcrypt");

const router = express.Router();

router.post("/register", async (req, res) => {
  const body = req.body;
  const reqKeys = ["first_name", "last_name", "email", "password"];

  if (!body && !reqKeys.every((key) => key in body)) {
    res.status(400).json({ message: "Invalid JSON Body" });
    return;
  }
  const passwordManagerObj = new passwordManager.PasswordManager();
  const hashedPassword = await passwordManagerObj.hashPassword(body.password);

  // mongodb logic
  const { email, first_name, last_name } = body;
  try {
    const newUser = new User({ email, first_name, last_name, password: hashedPassword });
    await newUser.save();
    res.status(200).json({message: "User Successfully Created"})
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(400).send("Error registering user.");
  }
});

router.get("/login", async (req, res) => {
  const body = req.body;
  const reqKeys = ["email", "password"];

  if (!body && !reqKeys.every((key) => key in body)) {
    res.status(400).json({ message: "Invalid JSON Body" });
    return;
  }

  // mongodb logic
  try {
    const { email, password } = body;
    const user = await User.findOne({ email });

    const passwordManagerObj = new passwordManager.PasswordManager();    

    if (user && (await passwordManagerObj.comparePassword(password, user.password))) {
      res.status(200).json({message: "Login Successful"});
      return;
    } else {
      res.status(401).json({message: "Invalid email or password"});
      return;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(400).send("Error logging in.");
  }
});

module.exports = router;
