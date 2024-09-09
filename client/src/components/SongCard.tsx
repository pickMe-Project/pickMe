import { SongType } from "@/db/models/Song";
import Link from "next/link";

type Props = {
  song: SongType;
};

export default function SongCard({ song }: Props) {
  return (
    <div className="w-full max-w-xl bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold font-libre text-black">
            {song.name}
          </h2>
          
        </div>
        <p className="text-sm text-gray-600 mb-1 font-cousine">
          Artist: {song.artist}
        </p>
        <p className="text-sm text-gray-600 mb-1 font-cousine">
          Key: {song.key} | Difficulty: {song.difficulty}
        </p>

        {/* 1 <= song.rating < 2 */}
        {song.rating >= 1 && song.rating < 2 && (
          <div className="flex items-center mb-2">
            <span className="text-yellow-400 text-sm mr-1">★</span>
            <span className="text-gray-300 text-sm">★★★★</span>
            <span className="ml-1 text-xs text-gray-600 font-cousine">
              ({song.rating})
            </span>
          </div>
        )}
        {/* 2 <= song.rating < 3 */}
        {song.rating >= 2 && song.rating < 3 && (
          <div className="flex items-center mb-2">
            <span className="text-yellow-400 text-sm mr-1">★★</span>
            <span className="text-gray-300 text-sm">★★★</span>
            <span className="ml-1 text-xs text-gray-600 font-cousine">
              ({song.rating})
            </span>
          </div>
        )}
        {/* 3 <= song.rating < 4 */}
        {song.rating >= 3 && song.rating < 4 && (
          <div className="flex items-center mb-2">
            <span className="text-yellow-400 text-sm mr-1">★★★</span>
            <span className="text-gray-300 text-sm">★★</span>
            <span className="ml-1 text-xs text-gray-600 font-cousine">
              ({song.rating})
            </span>
          </div>
        )}
        {/* 4 <= song.rating < 5 */}
        {song.rating >= 4 && song.rating < 5 && (
          <div className="flex items-center mb-2">
            <span className="text-yellow-400 text-sm mr-1">★★★★</span>
            <span className="text-gray-300 text-sm">★</span>
            <span className="ml-1 text-xs text-gray-600 font-cousine">
              ({song.rating})
            </span>
          </div>
        )}

        {/* song.rating === 5 */}
        {song.rating >= 5 && (
          <div className="flex items-center mb-2">
            <span className="text-yellow-400 text-sm mr-1">★★★★★</span>
            <span className="ml-1 text-xs text-gray-600 font-cousine">
              ({song.rating})
            </span>
          </div>
        )}
        <div className="mb-3">
          <h3 className="text-sm font-semibold mb-1 font-libre">Chords:</h3>
          <div className="flex flex-wrap gap-1 h-16 overflow-y-auto">
            <div>
            {song.chords.map((chord, index) => {
              return (
                <span
                  className="bg-gray-100 border border-gray-200 font-cousine rounded-full px-2 py-0.5 text-sm mb-1 mx-1"
                  key={index}
                >
                  {chord}
                </span>
              );
            })}
            {/* <span className="bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5 text-xs">
              G
            </span>
            <span className="bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5 text-xs">
              D
            </span>
            <span className="bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5 text-xs">
              A7sus4
            </span> */}
            </div>
          </div>
        </div>
        <Link
          href={`/songs/${song.slug}`}
          className="bg-black text-white px-3 py-1 text-sm rounded hover:bg-yellow-400 hover:text-black transition duration-300 font-cousine"
        >
          View Chords
        </Link>
      </div>
    </div>
  );
}
