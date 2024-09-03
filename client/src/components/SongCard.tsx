export default function SongCard() {
    return (
        <div className="w-full max-w-xl bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold font-libre text-black">Wonderwall</h2>
                    <button className="text-black hover:text-yellow-400 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>
                <p className="text-sm text-gray-600 mb-1 font-cousine">Artist: Oasis</p>
                <p className="text-sm text-gray-600 mb-1 font-cousine">Key: Em | Difficulty: Beginner</p>
                <div className="flex items-center mb-2">
                    <span className="text-yellow-400 text-sm mr-1">★★★★</span>
                    <span className="text-gray-300 text-sm">★</span>
                    <span className="ml-1 text-xs text-gray-600 font-cousine">(4.2)</span>
                </div>
                <div className="mb-3">
                    <h3 className="text-sm font-semibold mb-1 font-libre">Chords:</h3>
                    <div className="flex flex-wrap gap-1 font-cousine">
                        <span className="bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5 text-xs">Em</span>
                        <span className="bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5 text-xs">G</span>
                        <span className="bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5 text-xs">D</span>
                        <span className="bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5 text-xs">A7sus4</span>
                    </div>
                </div>
                <button className="bg-black text-white px-3 py-1 text-sm rounded hover:bg-yellow-400 hover:text-black transition duration-300 font-cousine">
                    View Chords
                </button>
            </div>
        </div>
    )
}