import { Song } from "@/db/models/Song";

type SecondParam = {
  params: {
    slug: string;
  };
};

// GET /api/songs/:slug
export async function GET(request: Request, { params }: SecondParam) {
  const song = await Song.findOne(params);

  return Response.json(song);
}
