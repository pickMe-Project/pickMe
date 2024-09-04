import { Song } from "@/db/models/Song";

// GET /api/songs
export async function GET(request: Request) {
  try {

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = 6;
    const search = url.searchParams.get("search") || undefined;

    const songs = await Song.findAll(page, limit, search);

    return Response.json(songs, {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
