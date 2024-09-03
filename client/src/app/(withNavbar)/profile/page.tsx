import ProfileCourseCard from "@/components/ProfileCourseCard";

export default function Profile() {
    return (
        <>
        <div className="container mx-auto px-4 pt-2 pb-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-black font-libre">Profile</h1>
                </div>
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-black mb-4 font-libre">User Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600 font-libre">Name:</p>
                            <p className="font-medium text-black font-cousine">John Doe</p>
                        </div>
                        <div>
                            <p className="text-gray-600 font-libre">Username:</p>
                            <p className="font-medium text-black font-cousine">johndoe123</p>

                        </div>
                        <div>
                            <p className="text-gray-600 font-libre">Email:</p>
                            <p className="font-medium text-black font-cousine">johndoe@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-gray-50">
                    <h2 className="text-2xl font-semibold text-black mb-4 font-libre">Course Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProfileCourseCard />
                    <ProfileCourseCard />
                    <ProfileCourseCard />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}