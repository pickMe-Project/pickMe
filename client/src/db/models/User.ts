import { ObjectId, WithId } from "mongodb";
import { z } from "zod";
import { db } from "../config";
import { hash, hashSync } from "bcryptjs";
import { UserTypeGoogle } from "@/app/api/auth/google/route";

const CourseSchema = z.object({
  songId: z.instanceof(ObjectId),
  name: z.string(),
  artist: z.string(),
  progress: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const UserSchema = z.object({
  name: z.string(),
  username: z
    .string()
    .refine(
      (username) => {
        return Boolean(username);
      },
      { message: "must be filled" }
    )
    .refine(
      async (username) => {
        const existingUser = await db.collection("Users").findOne({ username });
        return !existingUser;
      },
      { message: "must be unique" }
    ),
  email: z.string().email(),
  password: z.string().min(5),
  courses: z.array(CourseSchema).optional(),
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
    await UserSchema.parseAsync(newUser);
    newUser.password = await hash(newUser.password, 10);
    newUser.createdAt = newUser.updatedAt = new Date();
    newUser.courses = [];
    const result = await this.col().insertOne(newUser);
    return {
      ...newUser,
      _id: result.insertedId,
    };
  }

  static async createGoogle(newUser: UserTypeGoogle) {
    // Hapus validasi password karena login Google tidak memerlukan password
    const { password, ...userWithoutPassword } = newUser;
    await UserSchema.omit({ password: true }).parseAsync(userWithoutPassword);

    const now = new Date();
    const userToInsert = {
      ...userWithoutPassword,
      createdAt: now,
      updatedAt: now,
      courses: [],
    };

    const result = await this.col().insertOne(userToInsert as any);
    return {
      ...userToInsert,
      _id: result.insertedId,
    };
  }

  static async addCourse(
    userId: string,
    songId: string,
    songName: string,
    songArtist: string,
    progress: string = "On Progress"
  ) {
    const existingCourse = await this.col().findOne({
      _id: new ObjectId(userId),
      "courses.songId": new ObjectId(songId),
    });

    if (existingCourse) {
      throw new Error("Course already added");
    }

    const course = {
      songId: new ObjectId(songId),
      name: songName,
      artist: songArtist,
      progress,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await this.col().updateOne(
      { _id: new ObjectId(userId) },
      {
        $push: { courses: course },
        $set: { updatedAt: new Date() },
      }
    );

    return result;
  }

  static async updateCourseProgress(
    userId: string,
    songId: string,
    progress: string = "Done"
  ) {
    const user = await this.col().findOne({
      _id: new ObjectId(userId),
      "courses.songId": new ObjectId(songId),
    });

    if (!user || !user.courses) {
      throw new Error("User or course not found");
    }

    const course = user.courses.find((course) =>
      course.songId.equals(new ObjectId(songId))
    );

    if (!course) {
      throw new Error("Course not found");
    }

    if (course.progress === "Done") {
      throw new Error("Course progress is already marked as Done");
    }

    const result = await this.col().updateOne(
      { _id: new ObjectId(userId), "courses.songId": new ObjectId(songId) },
      {
        $set: {
          "courses.$.progress": progress,
          "courses.$.updatedAt": new Date(),
          updatedAt: new Date(),
        },
      }
    );
    return result;
  }

  static async findCourse(userId: string, songId: string) {
    const user = await this.col().findOne({
      _id: new ObjectId(userId),
      "courses.songId": new ObjectId(songId),
    });

    if (!user || !user.courses) {
      return null;
    }

    const course = user.courses.find((course) =>
      course.songId.equals(new ObjectId(songId))
    );

    return course || null;
  }

  static async updateSubscription(userId: string, subscription: string) {
    const result = await this.col().updateOne(
      { _id: new ObjectId(userId) },
      { $set: { subscription } }
    );
    return result;
  }
}