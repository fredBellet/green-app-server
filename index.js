const express = require('express');
const connectDB = require('./database');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());

// Other middleware and route configurations
const authRoutes = require('./routes/auth');

app.use(authRoutes);

// Define the check-auth route
app.get('/check-auth', (req, res) => {
  // Implement your authentication check logic here

  // Example: Check if the user is authenticated based on a session or token
  if (req.session && req.session.user) {
    // User is authenticated
    res.json({ authenticated: true, user: req.session.user });
  } else {
    // User is not authenticated
    res.json({ authenticated: false });
  }
});

connectDB();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
