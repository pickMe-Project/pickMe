/**
 * @jest-environment node
 */

import "dotenv/config";
import { MongoClient } from "mongodb";
import { POST } from "@/app/api/register/route";
import { hash } from "bcryptjs";

const MONGO_URI = process.env.DATA_BASE_URL;
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

describe("POST /api/register", () => {
  it("should register a user with valid credentials", async () => {
    const reqObj = {
      json: async () => ({
        name: "John Doe",
        username: "john_doe",
        email: "john.doe@example.com",
        courses: [{ id: "1", title: "Math" }],
        password: "password123",
      }),
    } as any;

    const response = await POST(reqObj);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.message).toBe("Registered");

    const user = await db
      .collection("Users")
      .findOne({ email: "john.doe@example.com" });
    expect(user).not.toBeNull();
    expect(user.username).toBe("john_doe");
  });



  it("should return an error for duplicate email", async () => {
    await db.collection("Users").insertOne({
      name: "Jane Doe",
      username: "jane_doe",
      email: "jane.doe@example.com",
      courses: [{ id: "2", title: "Guitar" }],
      password: await hash("password123", 10),
    });

    const reqObj = {
      json: async () => ({
        name: "John Doe",
        username: "john_doe",
        email: "jane.doe@example.com",
        courses: [{ id: "1", title: "Drums  " }],
        password: "password123",
      }),
    } as any;

    const response = await POST(reqObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toEqual(
      expect.arrayContaining(["email must be unique"])
    );
  });

  it("should return an error for missing fields", async () => {
    const reqObj = {
      json: async () => ({
        name: "John Doe",
        username: "john_doe",
        email: "john.doe@example.com",
        courses: [{ id: "1", title: "Math" }],
      }),
    } as any;

    const response = await POST(reqObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toEqual(expect.arrayContaining(["password required"]));;
  });

  it("should return an error for invalid email format", async () => {
    const reqObj = {
      json: async () => ({
        name: "John Doe",
        username: "john_doe",
        email: "invalid-email",
        courses: [{ id: "1", title: "Math" }],
        password: "password123",
      }),
    } as any;

    const response = await POST(reqObj);
    const body = await response.json();

    
  expect(response.status).toBe(400);
  expect(body.error).toEqual(expect.arrayContaining(["email invalid format"]));
  });

  it("should return an error for username that is not unique", async () => {
    await db.collection("Users").insertOne({
      name: "Jane Doe",
      username: "john_doe",
      email: "jane.doe@example.com",
      courses: [{ id: "2", title: "Science" }],
      password: await hash("password123", 10),
    });

    const reqObj = {
      json: async () => ({
        name: "John Doe",
        username: "john_doe",
        email: "john.doe@example.com",
        courses: [{ id: "1", title: "Math" }],
        password: "password123",
      }),
    } as any;

    const response = await POST(reqObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toContain("username must be unique");
  });
});
