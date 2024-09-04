import { User, UserType } from "@/db/models/User";
import { compare } from "bcryptjs";
import { z, ZodError } from "zod";
import { sign } from "jsonwebtoken"

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json() as UserType
        LoginSchema.parse(body)
        const user = await User.findOne({email: body.email})
        if(!user) {
            return new Response("Invalid email/password")
        }
        const isPasswordValid = await compare(body.password, user.password)
        if(!isPasswordValid) {
            return new Response("Invalid password")
        }

        const {password, ...safeUser} = user
        const access_token = sign(safeUser, process.env.JWT_SECRET as string)
        return Response.json({access_token: access_token})
    } catch (error) {
        if(error instanceof ZodError) {
            const format = error.issues.map(issue => {
                return issue.path[0] + ": " + issue.message.toLowerCase()
            })
            return new Response(format.join("\n"), {status: 400})
        }
        return Response.json(error)
        
    }
}
   