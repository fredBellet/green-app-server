const express = require('express');
const router = express.Router();
const Score = require('../models/scores');
const User = require('../models/user');

// Save the score to the database
router.post('/scores', async (req, res) => {
    try {
      // Extract the username and score from the request body
      const { username, score } = req.body;
  
      // Find the user by the username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Create a new score document with the user's id and the provided score
      const newScore = new Score({ userId: user._id, score });
  
      // Save the score to the database
      await newScore.save();
  
      // Send a success response
      res.status(200).json({ message: 'Score saved successfully' });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(error);
      res.status(500).json({ message: 'An error occurred while saving the score' });
    }
  });

// Fetch scores
router.get('/scores', async (req, res) => {
    try {
      const scores = await Score.find().populate('userId', 'username'); // Fetch all scores and populate the associated user with only the 'username' field
      res.status(200).json(scores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching the scores' });
    }
  });

module.exports = router;
