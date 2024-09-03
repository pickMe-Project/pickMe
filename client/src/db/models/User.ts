import { ObjectId, WithId } from "mongodb";
import { z } from "zod";
import { db } from "../config";
import { hash, hashSync } from "bcryptjs";

const UserSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type UserType = WithId<z.infer<typeof UserSchema>>;

export class User {
  static col() {
    return db.collection<UserType>("Users");
  }

  static async findAll() {
    const result = await this.col().find().toArray();
    return result;
  }

  static async findByPk(id: string) {
    const result = await this.col().findOne({ _id: new ObjectId(id) });
    return result;
  }

  static async findOne(filter: Partial<UserType>) {
    const result = await this.col().findOne(filter);
    return result;
  }

  static async create(newUser: UserType) {
    newUser.password = await hash(newUser.password, 10);
    const result = await this.col().insertOne(newUser);
    return {
      ...newUser,
      _id: result.insertedId,
    };
  }
}