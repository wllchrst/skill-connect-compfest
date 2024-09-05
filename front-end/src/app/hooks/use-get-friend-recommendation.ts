import { useEffect, useState } from "react";
import { IUser } from "../interfaces/user-interface";
import UserService from "../service/user-service";
import { useUserContext } from "../contexts/user-context";
import ToastBuilder from "../builder/toast-builder";
import { useRealtimeContext } from "../contexts/realtime-context";

const userService = new UserService();

function useGetFriendRecommendation() {
  const { c } = useRealtimeContext();
  const [userRecommendation, setUserRecommendation] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserContext();
  const toast = new ToastBuilder("Viewing Users");

  async function fetchFriendRecommendation() {
    if (user == null) {
      toast.destructive("User must be logged in");
      setIsLoading(false);
      return;
    }

    const response = await userService.getFriendRecommendation(user.id);

    if (!response.success) {
      toast.destructive(response.message);
      setIsLoading(false);
      return;
    }

    setUserRecommendation(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchFriendRecommendation();
  }, [c]);

  return { userRecommendation, isLoading };
}

export default useGetFriendRecommendation;
