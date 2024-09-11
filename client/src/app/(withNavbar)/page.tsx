import MarqueeLanding from "@/components/MarqueeLanding";
import AOSWrapper from "@/components/AosWrapper";
import { SongType } from "@/db/models/Song";
import Link from "next/link";
import Chat from "@/components/Chat";

export default async function Home() {
  const data = await fetch("http://localhost:3000/api/songs", {
    cache: "no-store",
  })
  const songs: SongType[] = await data.json()
  const featuredSongs = songs.slice(0, 3);

  return (
    <>
      <AOSWrapper>
        {/* Header */}
        <div className="flex justify-between">
          <div className="w-[80vh] h-screen flex items-center justify-center" data-aos="fade-right">
            <img
              className="w-[71vh] h-[100vh] object-cover"
              src="https://images.unsplash.com/photo-1593698054498-56898cbad8af?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="1st image"
            />
          </div>
          <div className="w-1/2 h-screen mt-[30vh]" data-aos="fade-down">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-[3rem] italic font-black font-libre">Road to Rockstar</h1>
              <img
                className="w-[80vh] h-[75vh] object-cover"
                src="https://images.unsplash.com/photo-1644280930023-aeb3df02f310?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="2nd image"
              />
            </div>
          </div>
          <div className="w-[60vh] h-screen flex items-start justify-end mt-[7vh]" data-aos="fade-left">
            <img
              className="w-[50vh] h-[81vh] object-cover"
              src="https://images.unsplash.com/photo-1593697972422-9d9cb386afd8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="3rd image"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex justify-start items-center px-[15vh]" data-aos="fade-up">
          <div className="w-[65%] h-[40vh]">
            <p className="text-xl font-normal font-cousine">
              pickMe! is your ultimate online destination for mastering the guitar with ease. Whether you&apos;re a beginner
              looking to strum your first chord or an experienced player aiming to perfect your skills, pickMe! offers an
              extensive library of guitar tabs and chords tailored for every level. With an intuitive interface, users can
              easily find songs, learn finger placements, and explore various styles. Join a community of passionate
              guitar learners, access expert-curated lessons, and elevate your guitar playing journey today with pickMe!
              where every chord is a step towards mastery.
            </p>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative" data-aos="fade-left">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
          <MarqueeLanding />
        </div>

        {/* Featured Songs */}
        <div className="py-10 px-[15vh]" data-aos="fade-up">
          <h2 className="text-3xl font-bold font-libre mb-8">Featured Songs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSongs.map((song, index) => (
              <Link href={`/songs/${song.slug}`} key={song.slug}>
                <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer">
                  <img
                    src={`/artist-${index + 1}.jpg`}
                    alt={song.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold font-libre">{song.name}</h3>
                    <p className="text-sm font-cousine">{song.artist}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Explore More Hero Section */}
          <div className="relative h-[80vh] mt-16 mb-10 overflow-hidden" data-aos="fade-up">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Urban guitar background"
                className="w-full h-full object-cover filter brightness-50"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
              <h2 className="text-5xl font-bold font-libre mb-6 tracking-wider">Discover Your Sound</h2>
              <p className="text-xl font-cousine mb-10 max-w-2xl">
                Unlock a lifetime of musical mastery! Subscribe once for unlimited access to our
                extensive tabs and exclusive tutorial videos. From beginner to virtuoso, your
                journey starts here.
              </p>
              <Link href="/subscription" className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-yellow-500 active:scale-95 relative overflow-hidden group">
                <span className="relative z-10">Subscribe</span>
                <span className="absolute inset-0 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </div>
          </div>
        </div>
        <Chat />
      </AOSWrapper>
    </>
  );
}
