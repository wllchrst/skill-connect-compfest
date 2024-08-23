import { useEffect, useState } from "react";
import { IUser } from "../interfaces/user-interface";
import Cookies from "js-cookie";
import { userTokenKey } from "../data/web-contant";
import UserService from "../service/user-service";
import { useUserContext } from "../contexts/user-context";

export default function useGetUserInformation() {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userService = UserService.getInstance();

  const userToken = Cookies.get(userTokenKey);

  async function fetchUserInformation() {
    if (userToken == undefined || userToken == null) {
      setIsLoading(false);
      return;
    }

    const userInformation = await userService.getUserInformation(userToken);

    if(userInformation) 
  }

  useEffect(() => {
    fetchUserInformation();
  }, []);

  return { user, isLoading };
}
