const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Score = require('../models/scores');
const bcrypt = require('bcrypt');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Create a new User instance
    const user = new User({
      username,
      passwordHash: password,
    });

    // Save the user to the database
    await user.save();

    // Calculate the score for the registered user
    const score = await Score.calculateScore(user._id);

    res.status(200).json({ message: 'Registration successful', score });
  } catch (error) {
    console.error('Failed to register user:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Authenticate a user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if a user with the provided username exists in the database
    const user = await User.findOne({ username });

    // If the user is found, compare the provided password with the stored hashed password
    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      // Authentication successful

      // Calculate the score for the authenticated user
      const score = await Score.calculateScore(user._id);

      res.status(200).json({ success: true, message: 'Login successful', score });
    } else {
      // Authentication failed
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Save the score to the database
router.post('/scores', async (req, res) => {
  try {
    const { score } = req.body;

    // Create a new Score instance
    const scoreEntry = new Score({
      score,
    });

    // Save the score to the database
    await scoreEntry.save();

    res.status(200).json({ message: 'Score saved successfully' });
  } catch (error) {
    console.error('Failed to save score:', error);
    res.status(500).json({ message: 'Score saving failed' });
  }
});

module.exports = router;
