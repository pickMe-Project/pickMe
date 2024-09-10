import { NextResponse } from "next/server";
import axios from "axios";
import { MongoClient } from "mongodb";
import { hash } from "bcryptjs";
import { ObjectId } from "mongodb";



type userGoogle = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  courses: any[];
  password: string;
};

const MONGO_URI = process.env.DATA_BASE_URL;
const client = new MongoClient(MONGO_URI);

export async function POST(req: Request) {
  if (!client.connect()) await client.connect();
  const db = client.db(process.env.DB_NAME);

  const { token } = await req.json();
console.log(token,"<<<<token");

  try {
    const googleRes = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { email, name } = googleRes.data;

    
    let user = await db.collection("Users").findOne({ email });

    if (!user) {
     
      const hashedPassword = await hash(token, 10); 
      const newUser: userGoogle = {
        _id: new ObjectId(),
        name,
        username: email.split("@")[0], 
        email,
        courses: [],
        password: hashedPassword,
      };
      await db.collection("Users").insertOne(newUser);
      user = newUser;
    }

    return NextResponse.json(
      { message: "Login success", user: { email, name } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  } finally {
    await client.close();
  }
}
