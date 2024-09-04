import { User, UserType } from "@/db/models/User";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url ?? "", "http://localhost");
  const id = searchParams.get("id");

  const response = await User.findByPk(`${id}`);

  return Response.json(response, { status: 200 });
}
