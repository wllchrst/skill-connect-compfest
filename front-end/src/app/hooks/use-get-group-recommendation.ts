import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/user-context";
import ToastBuilder from "../builder/toast-builder";
import { IGroup } from "../interfaces/group-interface";
import GroupService from "../service/group-service";

function useGetGroupRecommendation() {
  const groupService = new GroupService();
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [userGroups, setUserGroups] = useState<IGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  const toast = new ToastBuilder("Group Recommendation");

  async function fetchGroupRecommendation() {
    const response = await groupService.getGroupRecommendation(user.id);
    if (!response.success) {
      toast.destructive("Something went wrong " + response.message);
      setIsLoading(false);
      return;
    }

    setGroups(response.data);
    setIsLoading(false);
  }

  async function fetchUserGroup() {
    const response = await groupService.getUserGroup(user.id);
    if (!response.success) {
      toast.destructive("Something went wrong " + response.message);
      setIsLoading(false);
      return;
    }

    setUserGroups(response.data);
    return;
  }

  useEffect(() => {
    if (user != null) {
      fetchGroupRecommendation();
      fetchUserGroup();
    }
  }, [user]);

  return { groups, isLoading, userGroups };
}

export default useGetGroupRecommendation;
