import SongCard from "@/components/SongCard";

export default function Songs() {
    
    return (
        <>
            {/* Search Bar */}
            <div className="flex flex-col items-center justify-start pt-2 bg-white">
                <div className="w-full max-w-3xl mb-5 text-center">
                    <h1 className="text-5xl font-bold mb-4 font-libre text-gray-800">Journey to Rockstar Starts Here</h1>
                </div>
                <div className="w-full max-w-lg">
                    <input
                        type="text"
                        placeholder="Search for songs..."
                        className="w-full px-6 py-3 text-lg border-b-2 border-gray-300 focus:outline-none focus:border-black transition duration-300 font-cousine"
                    />
                </div>
            </div>
            
            {/* songs */}
            <div className="flex flex-wrap items-center justify-center min-h-screen bg-white gap-5 py-10">
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
            </div>
        </>
    )
}