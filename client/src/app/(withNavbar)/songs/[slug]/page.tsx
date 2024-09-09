import AddSongToCourse from "@/components/AddSongToCourse";
import { SongType } from "@/db/models/Song";
import Link from "next/link";

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
                <div className="mb-5 flex flex-col items-center">
                    <h1 className="text-4xl font-bold font-libre">{song.name}</h1>
                    <h2 className="text-2xl text-gray-600 font-semibold font-libre">{song.artist}</h2>
                </div>
                <div className="w-full max-w-3xl">
                    <div className="mb-4">
                        <div>
                            <div className="flex items-center justify-between gap-x-10">
                                <div>
                                    <p className="text-sm text-gray-600 font-libre">Key:</p>
                                    <p className="text-base font-semibold">{song.key}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-libre">Tuning:</p>
                                    <p className="text-base font-semibold">{song.tuning.join(" ")}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-libre">Difficulty:</p>
                                    <p className="text-base font-semibold">{song.difficulty}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-libre">Capo:</p>
                                    <p className="text-base font-semibold">{song.capo}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-libre">Rating:</p>
                                    <p className="text-base font-semibold">{song.rating}/5</p>
                                </div>
                                <div className="mt-8">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end my-5 w-[43rem]">
                      <AddSongToCourse  key={song.slug} song={song}/>
                        {/* <Link href={`/songs/${song.slug}/course`}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"

                        >
                            Add this song to my course
                        </Link> */}
                    </div>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Chords</h3>
                        <div className="flex flex-wrap gap-2 w-[43rem]">
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
