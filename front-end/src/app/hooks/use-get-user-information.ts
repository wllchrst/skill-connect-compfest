import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { userTokenKey } from "../data/web-contant";
import UserService from "../service/user-service";
import { useUserContext } from "../contexts/user-context";
import { useRealtimeContext } from "../contexts/realtime-context";

export default function useGetUserInformation() {
  const { setUser, user } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const userService = UserService.getInstance();
  const { c } = useRealtimeContext();
  const userToken = Cookies.get(userTokenKey);

  async function fetchUserInformation() {
    console.log("getting user information");
    if (userToken == undefined || userToken == null) {
      setIsLoading(false);
      return;
    }

    const response = await userService.getUserInformation(userToken);

    console.log(response.data);

    if (response.data != null) {
      setUser(response.data);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchUserInformation();
  }, [c]);

  return { isLoading, user };
}
