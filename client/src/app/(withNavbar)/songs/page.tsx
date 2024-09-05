"use client";

import Searchbar from "@/components/Searchbar";
import SongCard from "@/components/SongCard";
import { SongType } from "@/db/models/Song";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Songs() {
  const [songs, setSongs] = useState<SongType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const getSongs = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/songs?page=${page}&limit=6&search=${search}`
        );

        if (!response.ok) throw new Error("Failed to fetch songs");
        const data: SongType[] = await response.json();

        if (data.length < 6) {
          setHasMore(false);
        }

        // Check duplicate
        setSongs((prevSongs) => {
          const newSongs = data.filter(
            (song) => !prevSongs.some((p) => p.slug === song.slug)
          );
          return [...prevSongs, ...newSongs];
        });
      } catch (error) {
        console.log(error);
      }
    };
    getSongs();
  }, [page, search]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = (keyword: string) => {
    setSearch(keyword);
    setPage(1);
    setHasMore(true);
    setSongs([]);
  };

  return (
    <>
      {/* Search Bar */}
      <div className="flex flex-col items-center justify-start pt-2 bg-white">
        <div className="w-full max-w-3xl mb-5 text-center">
          <h1 className="text-5xl font-bold mb-4 font-libre text-gray-800">
            Journey to Rockstar Starts Here
          </h1>
        </div>
        <Searchbar handleSearchChange={handleSearchChange} search={search} />
      </div>

      {/* songs */}
      <InfiniteScroll
        dataLength={songs.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="my-10 justify-center items-center mx-auto text-center">
            Loading...
          </div>
        }
        endMessage={
          songs.length > 0 && (
            <p className="mb-8 text-center text-md font-light">
              You have seen all songs
            </p>
          )
        }
      >
        {songs.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center min-h-screen bg-white gap-5 py-10">
            {songs.map((song) => {
              return <SongCard key={song.slug} song={song} />;
            })}
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <p className="text-center text-red-600">Song not found</p>
          </div>
        )}
      </InfiniteScroll>
    </>
  );
}
