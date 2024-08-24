import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { userTokenKey } from "../data/web-contant";
import UserService from "../service/user-service";
import { useUserContext } from "../contexts/user-context";

export default function useGetUserInformation() {
  const { setUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const userService = UserService.getInstance();
  const userToken = Cookies.get(userTokenKey);

  async function fetchUserInformation() {
    if (userToken == undefined || userToken == null) {
      setIsLoading(false);
      return;
    }

    const response = await userService.getUserInformation(userToken);

    if (response.data != null) {
      setUser(response.data);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchUserInformation();
  }, []);

  return { isLoading };
}
