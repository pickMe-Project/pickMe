"use client";

import { SongType } from "@/db/models/Song";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  song: SongType;
};

export default function AddSongToCourse({ song }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAddSongToCourse = async (
    songId: string,
    songName: string,
    songArtist: string
  ) => {
    setLoading(true);

    const form = {
      songId,
      songName,
      songArtist,
    };

    try {
        const response = await fetch(`http://localhost:3000/api/user`, {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
        });
          console.log(response, "<<<<<<<<< responseComponentAddToSongCourse");

        if (!response.ok) {
          const errorBody = await response.json();

          if (
            errorBody.error === "Invalid Token" ||
            errorBody.error === "Please subscribe to PickMe!"
          ) {
            router.push(`/songs/${song.slug}/course`);
          }
          if(errorBody.error === "Invalid Token") {
            router.push(`/songs/${song.slug}/course`);
          }
          console.log(errorBody, "<<<<< errorBody");

          return;
        }
        const responseBody = await response.json();
        //   console.log(responseBody, "<<<<<<< responseBody AddSongToCourse");

        router.push(`/songs/${song.slug}/course`);
        router.refresh()
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false)
    }
    
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleAddSongToCourse(song._id.toString(), song.name, song.artist);
      }}
      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
    >
      {loading ? "Add this song to my course..." : "Add this song to my course"}
    </button>
  );
}
