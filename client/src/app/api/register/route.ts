import { z, ZodError } from "zod";
import { User, UserType } from "@/db/models/User";
import { db } from "@/db/config";

const courseSchema = z.object({
  id: z.string(), 
  title: z.string(),
});

const RegisterSchema = z.object({
  name: z.string().min(1, { message: "must be filled" }),
  username: z
    .string()
    .min(1, { message: "must be filled" })
    .refine(
      async (username) => {
        const existingUser = await db.collection("Users").findOne({ username });
        return !existingUser;
      },
      { message: "must be unique" }
    ),
  email: z.string().email({ message: "invalid format" }).refine(
    async (email) => {
      const existingUser = await db.collection("Users").findOne({ email });
      return !existingUser;
    },
    { message: "must be unique" }
  ),
  courses: z.array(courseSchema),
  password: z.string().min(5, { message: "minimum 5 characters" }),
});

//--------------- course schema -----------
// const courseSchema = z.object({
//   id: z.string(), 
//   title: z.string(),
// });
//-----------

// const RegisterSchema = z.object({
//   name: z.string(),
//   username: z
//     .string()
//     .refine(
//       (username) => {
//         return Boolean(username);
//       },
//       { message: "must be filled" }
//     )
//     .refine(
//       async (username) => {
//         const existingUser = await db.collection("Users").findOne({ username });
//         return !existingUser;
//       },
//       { message: "must be unique" }
//     ),
//   email: z.string().email(),
//   courses: z.array(courseSchema),
//   password: z.string().min(5),
// });

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UserType;

    const userCheck = await User.findOne({ email: body.email });

    if (userCheck) {
      return Response.json({ error: "Email Already Used" }, { status: 400 });
    }
    await User.create(body);
    return Response.json({ message: "Registered" }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      const formated = error.issues.map((e) => {
        return e.path[0] + " " + e.message.toLowerCase();
      });
      return Response.json({ error: formated }, { status: 400 });
    }
    return Response.json({ error: "Internal Error Server" }, { status: 500 });
  }
}
