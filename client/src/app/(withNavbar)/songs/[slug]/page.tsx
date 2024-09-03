export default function SongDetail() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center bg-white text-black">
                <h1 className="text-3xl font-bold font-libre mb-6">Song Title</h1>
                <div className="w-full max-w-3xl">
                    <div className="flex items-center mb-4">
                        <img src="/PickMe_transparent.svg" alt="Song Image" className="w-16 h-16 rounded-full mr-4 bg-gray-200" />
                        <div>
                            <h2 className="text-xl font-semibold font-libre">Artist Name</h2>
                            <div className="flex flex-row gap-x-3">
                                <p className="text-sm text-gray-600 font-libre mr-4">Key: C</p>
                                <p className="text-sm text-gray-600 font-libre mr-4">Tuning: Standard</p>
                                <p className="text-sm text-gray-600 font-libre mr-4">Difficulty: beginner</p>
                                <p className="text-sm text-gray-600 font-libre mr-4">Capo: 1st fret</p>
                                <p className="text-sm text-gray-600 font-libre">Rating: 4.5/5</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Chords</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-yellow-400 text-black rounded">Am</span>
                            <span className="px-2 py-1 bg-yellow-400 text-black rounded">C</span>
                            <span className="px-2 py-1 bg-yellow-400 text-black rounded">G</span>
                            <span className="px-2 py-1 bg-yellow-400 text-black rounded">F</span>
                        </div>
                    </div>
                    <div className="font-mono whitespace-pre-wrap">
                        <div className="mb-4">
                            <h4 className="font-semibold mb-2">[Verse 1]</h4>
                            <div className="mb-2">
                                <p className="text-yellow-600">Am C</p>
                                <p>Here's the first line</p>
                            </div>
                            <div>
                                <p className="text-yellow-600">G F</p>
                                <p>And here's the second line</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-semibold mb-2">[Chorus]</h4>
                            <div className="mb-2">
                                <p className="text-yellow-600">Am C G F</p>
                                <p>This is how the chorus goes</p>
                            </div>
                            <div>
                                <p className="text-yellow-600">Am C G F</p>
                                <p>With some more chords and prose</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}