import useGetCourseRecommendation from "@/app/hooks/use-get-course-recommendation";
import CourseCard from "../course/course-card";

function HomeCourseRecommendation() {
  const { courses, isLoading } = useGetCourseRecommendation();
  if (isLoading) return <></>;
  return (
    <div className="p-4">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4">
        Courses
      </h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent pb-2">
        {courses.map((course, index) => (
          <div key={course.id} className="flex-shrink-0 w-[350px]">
            {" "}
            {/* Adjust height as needed */}
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeCourseRecommendation;
