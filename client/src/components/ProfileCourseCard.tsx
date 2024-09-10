import { ObjectId } from "mongodb";
import Link from "next/link";

type Props = {
  course: {
    songId: ObjectId,
    slug: string,
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
    <Link
      href={`songs/${course.slug}/course`}
      className="bg-white p-4 rounded-lg shadow hover:scale-[1.02]"
    >
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
    </Link>
  );
}
