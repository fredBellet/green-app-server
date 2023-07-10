const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: { type: Number, required: true },
});

scoreSchema.statics.calculateScore = async function (userId) {
  try {
    // Implement your score calculation logic here based on the user's information
    // You can fetch the necessary data from the other collections or perform any calculations
    
    // Example: Calculate the score based on some hypothetical criteria
    const user = await mongoose.model('User').findById(userId);
    let score = 0;

    // Increment the score based on some criteria
    if (user.transportation === 'Use public transportation') {
      score += 5;
    } else if (user.transportation === 'Bike') {
      score += 7;
    }
    
      

    // Update the score in the "scores" collection
    await this.findOneAndUpdate(
      { userId },
      { score },
      { upsert: true, new: true }
    );

    return score;
  } catch (error) {
    console.error('Failed to calculate score:', error);
    throw error;
  }
};

const score = mongoose.model('Score', scoreSchema);

module.exports = score;
