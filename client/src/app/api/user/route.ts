import { User, UserType } from "@/db/models/User";

export async function GET(request: Request) {
  try {
    const userId: string = request.headers.get("x-user-id") || "";
    const response = await User.findByPk(userId);
    if (!response) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

// Add Course
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    body.userId = request.headers.get("x-user-id") || "";

    const { songId, songSlug, songName, songArtist, userId } = body

    let response = await User.addCourse(userId, songId, songSlug, songName, songArtist)
    
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    if(error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

// Update Course Progress
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    console.log(request.headers, "<<<<<<<<< request.headersUser");
    

    body.userId = request.headers.get("x-user-id") || "";

    const { userId, songId, progress } = body;

    let response = await User.updateCourseProgress(userId, songId, progress);

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
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