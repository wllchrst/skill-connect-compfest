import { ICourse } from "@/app/interfaces/course-interface";

interface I {
  course: ICourse;
}

function CourseCard({ course }: I) {
  return (
    <>
      <div
        key={course.id}
        className="bg-white text-black shadow-lg rounded-sm p-4 hover:bg-gray-200 transition-all duration-300 w-full"
      >
        <h3 className="text-lg font-bold mb-2 line-clamp-1">{course.title}</h3>
        <p className="text-gray-600 hover:text-gray-300 text-sm mb-4">
          {course.description.length > 100
            ? course.description.substring(0, 100) + "..."
            : course.description}
        </p>
        <div className="flex justify-between text-sm mb-2">
          <span>Level: {course.level}</span>
          <span>Rating: {course.rating}</span>
        </div>
        <a
          href={course.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-white underline"
        >
          Learn more
        </a>
      </div>
    </>
  );
}

export default CourseCard;
