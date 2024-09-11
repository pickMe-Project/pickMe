"use client";

import { SongType } from "@/db/models/Song";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  song: SongType;
};

export default function UpdateProgressLesson({ song }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpdateProgressLesson = async (
    songId: string,
    songProgress: string
  ) => {
    setLoading(true);

    const form = {
      songId,
      songProgress,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response, "<<<<<<<<< responseComponentUpdateProgressLesson");

      if (!response.ok) {
        const errorBody = await response.json();
        console.log(errorBody, "<<<<< errorBody");

        return;
      }
      const responseBody = await response.json();
      //   console.log(responseBody, "<<<<<<< responseBody UpdateProgressLesson");

      // router.push(`/profile`);
      router.refresh()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleUpdateProgressLesson(song._id.toString(), "Done");
      }}
      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
    >
      Mark As Done
    </button>
  );
}
