import { ObjectId } from "mongodb";

type Props = {
  course: {
    songId: ObjectId,
    name: string,
    artist: string,
    progress: string,
  };
};

type songCourse = {
  slug: string,
}


export default function ProfileCourseCard({course}: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-black mb-2 font-libre">
        {course.name}
      </h3>
      <p className="text-gray-600 mb-2 font-cousine">{course.artist}</p>
      <div className="flex items-center">
      {course.progress === "Done" ? (
        <span className="bg-yellow-100 text-yellow-700 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
          {course.progress}
        </span>
      ) : course.progress === "On Progress" ? (
        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
          {course.progress}
        </span>
      ) : (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
          {course.progress}
        </span>
      )}
      </div>
    </div>
  );
}
