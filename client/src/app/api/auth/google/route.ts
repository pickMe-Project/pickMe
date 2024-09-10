import type { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import  { sign } from 'jsonwebtoken';
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
  return sign(user, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

export async function POST(req: Request){
    const { googleToken } = await req.json();

    try {
      // Verify the Google token
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        return Response.json({ message: 'Invalid Google token' } ,{status : 401});
      }

      const { sub: googleId, email, name } = payload;


      let user = await User.findOne({ email }as any);
      
      if (!user) {
        const newUser: UserTypeGoogle = {
          googleId,
          email: email as string,
          name: name as string,
          username: email?.split("@")[0] as string, 
          password: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
         user = await User.createGoogle(newUser as any) as any
      }

      // Generate an access token   
        
      const accessToken = generateAccessToken(user);
      
      return Response.json({ access_token: accessToken });
    } catch (error) {
      console.error('Error during Google authentication:', error);
      return Response.json({ message: 'Internal Server Error' },{status:500});
    }

};
