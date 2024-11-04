require('dotenv').config();
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
      res.send('User registered successfully!');
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
      res.send('Login successful!');
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
