import useGetCourseRecommendation from "@/app/hooks/use-get-course-recommendation";
import Loading from "../loading";
import CourseCard from "./course-card";
import CourseSearch from "../community/course-search";

function CourseRecommendation() {
  const { courses, isLoading, searchCourse } = useGetCourseRecommendation();
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="pl-4 pt-4">
        <CourseSearch
          onSearch={(query) => {
            searchCourse(query);
          }}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white text-black shadow-lg rounded-sm p-4 hover:bg-gray-200 transition-all duration-300"
          >
            <h3 className="text-lg font-bold mb-2">{course.title}</h3>
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
        ))}
      </div>
    </>
  );
}

export default CourseRecommendation;
