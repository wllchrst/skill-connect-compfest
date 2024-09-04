"use client";
import HomeCourseRecommendation from "@/app/components/home/home-course-recommendation";
import { useUserContext } from "@/app/contexts/user-context";
import MainPageLayout from "@/app/layout/main-page-layout";

function HomePage() {
  const { user } = useUserContext();

  return (
    <MainPageLayout>
      <div className="flex flex-col relative h-[400px] backdrop-brightness-100 justify-center bg-[url('/images/home-page-background.jpg')] items-center bg-center bg-cover rounded-md mb-2">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <h1 className="relative scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Learn. Connect. Grow.
        </h1>
        <h3 className="relative scroll-m-20 text-lg font-semibold tracking-tight italic">
          Advance your IT expertise with courses and connections that matter.
        </h3>
      </div>

      <HomeCourseRecommendation />
    </MainPageLayout>
  );
}

export default HomePage;
