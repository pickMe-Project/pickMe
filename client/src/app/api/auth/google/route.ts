const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const User = require('../../models/User'); // Adjust path to your User model

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/api/auth/google', async (req, res) => {
  const { googleToken } = req.body;

  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    // Check if the user already exists
    let user = await User.findOne({ googleId });

    if (!user) {
      // Register a new user if not found
      user = new User({
        googleId,
        email,
        name,
        // You can add other user fields here
      });
      await user.save();
    }

    // Generate an access token or session (example shown is a placeholder)
    const accessToken = generateAccessToken(user);

    res.status(200).json({ access_token: accessToken });
  } catch (error) {
    console.error('Error during Google authentication:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Function to generate an access token (example placeholder)
const generateAccessToken = (user) => {
  // Implement token generation logic here
  // Example: return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return 'exampleAccessToken'; // Replace with actual token logic
};

module.exports = router;
