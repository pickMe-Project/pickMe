import YouTubePlayer from "@/components/YoutubePlayer";
import { SongType } from "@/db/models/Song";
import Chat from "@/components/Chat";
import UpdateProgressLesson from "@/components/UpdateProgressLesson";

type Props = {
  params: {
    slug: string;
  };
};

async function getSongBySlug(slug: string): Promise<SongType | undefined> {
  try {
    const response = await fetch(`http://localhost:3000/api/songs/` + slug);

    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const data: SongType = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Course(props: Props) {
  const song = await getSongBySlug(props.params.slug);
  // console.log(song, "<<<<<<< hereeeeeee");

  if (!song) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-600">Song not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-3xl font-bold mb-4 text-black font-libre">
              Guitar Tabs
            </h2>
            <div
              className="font-mono text-sm bg-gray-100 p-4 rounded-lg overflow-hidden"
              style={{ height: "400px", overflowY: "auto" }}
            >
              <img src={song.tabImg} alt={song.name} className="w-full h-auto" />
            </div>
          </div>
          <div className="flex-1 bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-3xl font-bold mb-4 text-black font-libre">
              Tutorial Video
            </h2>
            <div
              className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center"
              style={{ height: "400px" }}
            >
              <YouTubePlayer videoId={song.videoId} />
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          {/* <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Mark As Done
          </button> */}
          <UpdateProgressLesson song={song} />
        </div>
      </div>
      <Chat />
    </>
  );
}
