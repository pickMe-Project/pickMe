import { SongType } from "@/db/models/Song";
import Chat from "@/components/Chat";
import UpdateProgressLesson from "@/components/UpdateProgressLesson";
import Accordion from "@/components/Accordion ";

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

  if (!song) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-600">Song not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 flex flex-col h-1/2 mt-20">
        <div className="flex justify-end md:flex-row gap-8 mb-10">
          <UpdateProgressLesson song={song} />
        </div>
        <Accordion song={song} />
      </div>
      <Chat />
    </>
  );
}
