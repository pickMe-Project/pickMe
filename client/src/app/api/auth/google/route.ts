import type { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { User } from '../../../../db/models/User'; // Adjust the path as needed
import { any, z } from 'zod';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID as string);

type Data = {
  access_token?: string;
  message?: string;
};

export type UserTypeGoogle = {
  googleId: string;
  email: string;
  name: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
const generateAccessToken = (user: any) => {
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


      let user = await User.findOne({ googleId }as any);

      if (!user) {
        const newUser: UserTypeGoogle = {
          googleId,
          email: email as string,
          name: name as string,
          username: email as string, 
          password: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
         await User.createGoogle(newUser as any);
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
