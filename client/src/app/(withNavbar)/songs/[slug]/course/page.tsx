import { SongType } from "@/db/models/Song";
import Chat from "@/components/Chat";
import UpdateProgressLesson from "@/components/UpdateProgressLesson";
import Accordion from "@/components/Accordion ";
import { User, UserType } from "@/db/models/User";
import { cookies } from "next/headers";
import AddSongToCourse from "@/components/AddSongToCourse";

type Props = {
  params: {
    slug: string;
  };
};

async function getSongBySlug(slug: string): Promise<SongType | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/songs/` + slug);

    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const data: SongType = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getUser() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
      headers: {
        Cookie: cookies().toString(),
      },
    });

    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const data: UserType = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Course(props: Props) {
  const song = await getSongBySlug(props.params.slug);

  const user = await getUser();
  // console.log(user, "<<<<<<<<< userData");

  if (!user) {
    return null;
  }

  if (!song) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-600">Song not found</p>
      </div>
    );
  }

  const course = await User.findCourse(
    user._id.toString(),
    song._id.toString()
  );


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col min-h-screen">
        <div className="flex justify-end mb-6">
          {course?.progress === "On Progress" ? (
            <UpdateProgressLesson song={song} />
          ) : course?.progress === "Done" ? (
            <button
              disabled
              className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-full"
            >
              Done ✔
            </button>
          ) : (
            <AddSongToCourse key={song.slug} song={song} />
          )}
        </div>
        <div className="flex-grow">
          <Accordion song={song} />
        </div>
        <div className="mt-8">
          <Chat />
        </div>
      </div>
    </div>
  );
}
