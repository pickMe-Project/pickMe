import YouTubePlayer from "@/components/YoutubePlayer";
import { SongType } from "@/db/models/Song";

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-black">Guitar Course</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-black">
            Guitar Tabs
          </h2>
          <div
            className="font-mono text-sm whitespace-pre-wrap bg-gray-100 p-4 rounded"
            style={{ height: "400px", overflowY: "auto" }}
          >
            {/* Placeholder for guitar tabs */}
            {/* e|--------------------|\nB|--------------------|\nG|--------------------|\nD|--------------------|\nA|--------------------|\nE|--------------------| */}
            <img src={song.tabImg} alt={song.name} />
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-black">
            Tutorial Video
          </h2>
          <div
            className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center"
            style={{ height: "400px" }}
          >
            {/* <span className="text-gray-500 text-xl">Video Placeholder</span> */}
            <YouTubePlayer videoId={song.videoId} />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          Start Practice
        </button>
      </div>
    </div>
  );
}
