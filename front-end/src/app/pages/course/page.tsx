"use client";
import CourseSearch from "@/app/components/community/course-search";
import CourseRecommendation from "@/app/components/course/course-recommendation";
import MainPageLayout from "@/app/layout/main-page-layout";

function CoursePage() {
  return (
    <>
      <MainPageLayout>
        <div className="p-4">
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Courses
          </h2>
          <CourseRecommendation />
        </div>
      </MainPageLayout>
    </>
  );
}

export default CoursePage;
