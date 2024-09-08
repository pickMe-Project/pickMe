/**
 * @jest-environment node
 */

import "dotenv/config";
import { MongoClient } from "mongodb";
import { POST } from "@/app/api/login/route";
import { hash } from "bcryptjs";

const MONGO_URI = process.env.DATA_BASE_URL;

console.log({ MONGO_URI });
const client = new MongoClient(MONGO_URI);
let db: any;

beforeAll(async () => {
  if (!db) {
    await client.connect();
    let dbName = process.env.DB_NAME + "_test";
    db = client.db(dbName);
  }
});

afterAll(async () => {
  if (db) {
    await db.dropDatabase();
    await client.close();
  }
});

describe("POST /api/login", () => {
  it("should return a JWT token for valid credentials", async () => {
    const hashedPassword = await hash("password123", 10);
    await db
      .collection("Users")
      .insertOne({ email: "test@example.com", password: hashedPassword });

    const reqObj = {
      json: () => ({
        email: "test@example.com",
        password: "password123",
      }),
    } as any;
    const response = await POST(reqObj);
    const body = await response.json();

    console.log(body);

    expect(body).toHaveProperty("access_token");
  });

    it("should return an error for invalid email format", async () => {
      // const { req, res } = mockReqRes({
      //   email: "invalid-email",
      //   password: "password123",
      // });

      // await POST(req, res);

      const hashedPassword = await hash("password123", 10);
      await db
        .collection("Users")
        .insertOne({ email: "test@example.com", password: hashedPassword });

       const reqObj = {
         json: () => ({
           email: "invalid-email",
           password: "password123",
         }),
       } as any;
       const response = await POST(reqObj);
       const body = await response.json();

       console.log(body,">>>>>");
      // expect(body).toBe(400);
      // expect(body).toContain("email: invalid email");
    });

    it("should return an error for incorrect password", async () => {
      const hashedPassword = await hash("password123", 10);
      await db
        .collection("Users")
        .insertOne({ email: "test@example.com", password: hashedPassword });

      const reqObj = {
        json: () => ({
          email: "test@example.com",
          password: "passwordInvalid",
        }),
      } as any;
      const response = await POST(reqObj);
      const body = await response.json();

      // expect(body).toBe(400);
      // expect(body).toBe("Invalid password");
    });

    it("should return an error for non-existent user", async () => {     

     const reqObj = {
       json: () => ({
         email: "wrong@example.com",
         password: "passwordInvalid",
       }),
     } as any;
     const response = await POST(reqObj);
     const body = await response.json();

      // expect(body).toBe(400);
      // expect(body).toBe("Invalid email/password");
    });

    it("should return validation error for missing fields", async () => {
     const hashedPassword = await hash("password123", 10);
     await db
       .collection("Users")
       .insertOne({ email: "test@example.com", password: hashedPassword });

     const reqObj = {
       json: () => ({
         email: "test@example.com",
       }),
     } as any;
     const response = await POST(reqObj);
     const body = await response.json();


      // expect(body).toBe(400);
      // expect(body).toContain("password: required");
    });
});
