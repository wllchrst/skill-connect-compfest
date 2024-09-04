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
          <CourseCard course={course} />
        ))}
      </div>
    </>
  );
}

export default CourseRecommendation;
