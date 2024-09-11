import { User, UserType } from "@/db/models/User";
import { compare } from "bcryptjs";
import { z, ZodError } from "zod";
import { sign } from "jsonwebtoken"

const LoginSchema = z.object({
    email: z.string().email({ message: "Email format is invalid" }),
    password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
  });

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json() as UserType
        LoginSchema.parse(body)
        const user = await User.findOne({email: body.email})
        if(!user) {
            return Response.json({error: "Invalid email or password"}, {status: 400})
        }
        const isPasswordValid = await compare(body.password, user.password)
        if(!isPasswordValid) {
            return Response.json({error: "Invalid email or password"}, {status: 400})
        }
        const {password, ...safeUser} = user
        const access_token = sign(safeUser, process.env.JWT_SECRET as string)
        return Response.json({access_token: access_token})
    } catch (error) {
        if(error instanceof ZodError) {
            const format = error.issues.map(issue => {
                return issue.message.toLowerCase()
            })
            return Response.json({error: format.join("\n")}, {status: 400})
        }
        return Response.json({error: 'Internal server error'}, {status: 500})
        
    }
}