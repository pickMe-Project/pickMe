import { ObjectId } from "mongodb";

type Props = {
  course: {
    songId: ObjectId,
    name: string,
    artist: string,
    progress: string,
  };
};

export default function ProfileCourseCard({course}: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-black mb-2 font-libre">
        {course.name}
      </h3>
      <p className="text-gray-600 mb-2 font-cousine">{course.artist}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-yellow-400 h-2.5 rounded-full"
          style={{ width: "45%" }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 font-cousine">{course.progress}</p>
    </div>
  );
}
