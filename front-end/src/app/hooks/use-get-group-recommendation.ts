import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/user-context";
import { CourseService } from "../service/course-service";
import ToastBuilder from "../builder/toast-builder";
import { IGroup } from "../interfaces/group-interface";
import GroupService from "../service/group-service";

function useGetGroupRecommendation() {
  const groupService = new GroupService();
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  const toast = new ToastBuilder("Group Recommendation");

  async function fetchCourseRecommendation() {
    const response = await groupService.getGroupRecommendation(user.id);
    if (!response.success) {
      toast.destructive("Something went wrong " + response.message);
      setIsLoading(false);
      return;
    }

    setGroups(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (user != null) fetchCourseRecommendation();
  }, [user]);

  return { groups, isLoading };
}

export default useGetGroupRecommendation;
