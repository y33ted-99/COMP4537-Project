const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser');

dotenv.config({ path: require("path").resolve(__dirname, ".env") });

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(express.static(`${__dirname}/public`));

// auth middleware function
function authMiddleware(req, res, next) {
    const token = req.cookies && req.cookies.auth_token;
    if (!token || !validateToken(token)) {
        return res.redirect('/login');
    }
    next();
}

app.get("/login", (_, res) => {
    res.sendFile("public/login.html", {root: __dirname});
});

app.get("/register", (_, res) => {
    res.sendFile("public/register.html", {root: __dirname});
});

app.get("/user", authMiddleware, (_, res) => {
    res.sendFile("public/user.html", {root: __dirname});
});

app.listen("8080", () => {
    console.log("Listening on Port 8080");
})require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/user');
const ApiToken = require('./models/apiToken');
const ApiCall = require('./models/apiCall');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));




app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});


app.post('/register', async (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    try {
      const newUser = new User({ email, first_name, last_name, password });
      await newUser.save();
      res.sendFile(path.join(__dirname, 'public', 'login.html'));
    } catch (err) {
      console.error('Error registering user:', err);
      res.send('Error registering user.');
    }
});


app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await user.comparePassword(password)) {
        res.sendFile(path.join(__dirname, 'public', 'user.html'));
    } else {
      res.send('Invalid username or password');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.send('Error logging in.');
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
