import ProfileCourseCard from "@/components/ProfileCourseCard";

export default function Profile() {
    return (
        <>
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center">
                <img src="/PickMe_transparent.svg" alt="Profile Picture" className="w-28 h-28 rounded-full mb-4 bg-gray-300" />
                <h1 className="text-3xl font-bold text-black font-libre mb-6">John Doe</h1>
                <div className="text-center mb-8">
                    <p className="text-gray-600 font-libre">Username: <span className="font-medium text-black font-cousine">johndoe123</span></p>
                    <p className="text-gray-600 font-libre">Name: <span className="font-medium text-black font-cousine">John Doe</span></p>
                    <p className="text-gray-600 font-libre">Email: <span className="font-medium text-black font-cousine">johndoe@gmail.com</span></p>
                </div>
            </div>
            <div className="mt-4 px-10">
                <h2 className="text-2xl font-semibold text-black mb-4 font-libre px-5">Course Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProfileCourseCard />
                    <ProfileCourseCard />
                    <ProfileCourseCard />
                    <ProfileCourseCard />
                    <ProfileCourseCard />
                    <ProfileCourseCard />
                </div>
            </div>
        </div>
        </>
    )
}