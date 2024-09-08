import { User, UserType } from "@/db/models/User";
import { compare } from "bcryptjs";
import { z, ZodError } from "zod";
import { sign } from "jsonwebtoken";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as UserType;
    LoginSchema.parse(body);

    console.log(body, "<<body");

    const user = await User.findOne({ email: body.email });
    console.log(user, "<<user");
    if (!user) {
      return new Response(
        JSON.stringify({ errors: ["Invalid email/password"] }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const isPasswordValid = await compare(body.password, user.password);
    console.log(isPasswordValid, "<<isPasswordValid");
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ errors: ["Invalid password"] }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { password, ...safeUser } = user;
    const access_token = sign(safeUser, process.env.JWT_SECRET as string);
    return new Response(JSON.stringify({ access_token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const format = error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message.toLowerCase(),
      }));
      return new Response(JSON.stringify({ errors: format }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(
      JSON.stringify({ errors: [(error as Error).message] }),
      { status: 500, headers: { "Content-Type": "application/json" } } // Use 500 for unexpected server errors
    );
  }
}
