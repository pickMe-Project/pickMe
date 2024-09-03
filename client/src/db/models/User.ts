import { WithId } from "mongodb";
import { z } from "zod";

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type UserType = WithId<z.infer<typeof UserSchema>>;

export class User{
    static col(){
        return 
    }

    static async findAll() {
        const result = await this.col().find().toArray()
    }
}