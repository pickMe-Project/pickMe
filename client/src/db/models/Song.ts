import { z } from "zod";
import { db } from "../config";
import { WithId } from "mongodb";

const SongSchema = z.object({
  slug: z.string().refine(
    async (slug): Promise<boolean> => {
      const existingSong = await Song.col().findOne({ slug });
      return !existingSong;
    },
    {
      message: "slug must be unique",
    }
  ),
  name: z.string(),
  artist: z.string(),
  key: z.string(),
  chords: z.string().array(),
  difficulty: z.string(),
  tuning: z.string().array(),
  capo: z.string(),
  rating: z.number(),
  videoId: z.string(),
  tabImg: z.string(),
  lyrics: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type SongType = WithId<z.infer<typeof SongSchema>>;

export class Song {
  static col() {
    return db.collection<SongType>("Songs");
  }

  static async findAll(page: number = 1, limit: number = 6, search?: string) {
    try {
      let filter = {};
      if (search) {
        filter = {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { artist: { $regex: search, $options: "i" } },
          ],
        };
      }
      const skip = (page - 1) * limit;

      const result = await this.col()
        .find(filter)
        .sort({ name: 1 })
        .skip(skip)
        .limit(limit)
        .toArray();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async findOne(filter: Partial<SongType>) {
    try {
      const result = await this.col().findOne(filter);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
