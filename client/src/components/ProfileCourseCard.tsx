export default function ProfileCourseCard() {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-black mb-2 font-libre">Wonderwall</h3>
            <p className="text-gray-600 mb-2 font-cousine">Oasis</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-sm text-gray-500 font-cousine">Progress: 45%</p>
        </div>
    )
}