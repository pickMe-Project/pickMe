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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSongs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/songs?page=${page}&limit=6&search=${search}`
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
      } finally {
        setIsLoading(false);
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
      <div className="flex flex-col items-center justify-start pt-2 bg-white px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl mb-5 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-libre text-gray-800">
            Journey to Rockstar Starts Here
          </h1>
        </div>
        <Searchbar handleSearchChange={handleSearchChange} search={search} />
      </div>

      {/* Songs */}
      <InfiniteScroll
        dataLength={songs.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="my-6 sm:my-8 md:my-10 flex justify-center items-center mx-auto">
            <div className="relative inline-flex">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full absolute top-0 left-0 animate-ping"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full absolute top-0 left-0 animate-pulse"></div>
            </div>
            <span className="ml-3 sm:ml-4 font-cousine text-base sm:text-lg text-gray-600">Loading...</span>
          </div>
        }
        endMessage={
          songs.length > 0 && (
            <p className="mb-6 sm:mb-8 text-center text-sm sm:text-md font-light">
              You have seen all songs
            </p>
          )
        }
      >
        {songs.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center bg-white gap-3 sm:gap-4 md:gap-5 py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8">
            {songs.map((song) => {
              return <SongCard key={song.slug} song={song} />;
            })}
          </div>
        ) : (
          !isLoading && (
            <div className="container mx-auto px-4 py-6 sm:py-8">
              <p className="text-center text-red-600 font-cousine text-sm sm:text-base">Song not found</p>
            </div>
          )
        )}
      </InfiniteScroll>
    </>
  );
}
