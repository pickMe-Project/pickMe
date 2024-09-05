import { SongType } from "@/db/models/Song";

type Props = {
  params: {
    slug: string;
  };
};

async function getSongBySlug(slug: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/songs/` + slug);

    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const data: SongType = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export default async function SongDetail(props: Props) {
  const song = await getSongBySlug(props.params.slug);

  if (!song) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-600">Song not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center bg-white text-black">
        <h1 className="text-3xl font-bold font-libre mb-6">{song.name}</h1>
        <div className="w-full max-w-3xl">
          <div className="flex items-center mb-4">
            <img
              src="/PickMe_transparent.svg"
              alt="Song Image"
              className="w-16 h-16 rounded-full mr-4 bg-gray-200"
            />
            <div>
              <h2 className="text-xl font-semibold font-libre">
                {song.artist}
              </h2>
              <div className="flex flex-row gap-x-3">
                <p className="text-sm text-gray-600 font-libre mr-4">
                  Key: {song.key}
                </p>
                <p className="text-sm text-gray-600 font-libre mr-4">
                  Tuning: {song.tuning.join(" ")}
                </p>
                <p className="text-sm text-gray-600 font-libre mr-4">
                  Difficulty: {song.difficulty}
                </p>
                <p className="text-sm text-gray-600 font-libre mr-4">
                  Capo: {song.capo}
                </p>
                <p className="text-sm text-gray-600 font-libre">
                  Rating: {song.rating}/5
                </p>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Chords</h3>
            <div className="flex flex-wrap gap-2">
              {song.chords.map((song, index) => {
                return (
                  <span className="px-2 py-1 bg-yellow-400 text-black rounded" key={index}>
                    {song}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="font-mono whitespace-pre-wrap">
            <pre dangerouslySetInnerHTML={{ __html: song.lyrics }} />
          </div>
        </div>
      </div>
    </div>
  );
}
