import { User } from "@/db/models/User";

// Update Subscription Status
export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    body.userId = request.headers.get("x-user-id") || "";

    const { userId, subscription } = body;

    let response = await User.updateSubscription(userId, subscription);

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error, "<<<<<<<< error");
    
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
