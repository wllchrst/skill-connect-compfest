import { useEffect, useState } from "react";
import { ICourse } from "../interfaces/course-interface";
import { useUserContext } from "../contexts/user-context";
import { CourseService } from "../service/course-service";
import ToastBuilder from "../builder/toast-builder";

function useGetCourseRecommendation() {
  const courseService = new CourseService();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  const toast = new ToastBuilder("Course Recommendation");

  async function fetchCourseRecommendation() {
    const response = await courseService.getCourseRecommendation(user.id);
    if (!response.success) {
      toast.destructive("Something went wrong " + response.message);
      setIsLoading(false);
      return;
    }

    setCourses(response.data);
    setIsLoading(false);
  }

  async function searchCourse(query: string) {
    setIsLoading(true);
    const response = await courseService.searchCourse(query);
    if (!response.success) {
      toast.destructive("Something went wrong " + response.message);
      setIsLoading(false);
      return;
    }

    setCourses(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (user != null) fetchCourseRecommendation();
  }, [user]);

  return { courses, isLoading, searchCourse };
}

export default useGetCourseRecommendation;
