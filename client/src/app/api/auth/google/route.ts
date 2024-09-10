import type { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { User } from '../../../../db/models/User'; // Adjust the path as needed

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID as string);

type Data = {
  access_token?: string;
  message?: string;
};

const generateAccessToken = (user: any) => {
  // Replace with actual secret and token generation logic
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    const { googleToken } = req.body;

    try {
      // Verify the Google token
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        return res.status(401).json({ message: 'Invalid Google token' });
      }

      const { sub: googleId, email, name } = payload;

      // Connect to the database

      // Check if the user already exists
      let user = await User.findOne({ googleId });

      if (!user) {
        // Register a new user if not found
        user = {
          googleId,
          email,
          name,
          // You can add other user fields here
        };
        await User.create(user);
      }

      // Generate an access token
      const accessToken = generateAccessToken(user);

      res.status(200).json({ access_token: accessToken });
    } catch (error) {
      console.error('Error during Google authentication:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
