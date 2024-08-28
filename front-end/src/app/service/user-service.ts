import BackendService from "@/app/service/backend-service";
import { ICreateUser } from "../interfaces/create-user-interface";
import { IResponse } from "../interfaces/response-interface";
import { ILoginUser } from "../interfaces/login-user-interface";
import { IUser } from "../interfaces/user-interface";
import { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { userTokenKey } from "../data/web-contant";

class UserService extends BackendService {
  static instance: UserService | null = null;

  constructor() {
    super();
  }

  static getInstance() {
    if (this.instance == null) this.instance = new UserService();
    return this.instance;
  }

  async registerUser(createUser: ICreateUser): Promise<IResponse<boolean>> {
    const response = await this.post<IResponse<boolean>>("user", createUser);
    return response.data;
  }

  async loginUser(loginUserDTO: ILoginUser) {
    const response = await this.post<IResponse<string>>("auth", loginUserDTO);
    return response.data;
  }

  async getUserInformation(token: string) {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await this.get<IResponse<IUser>>(
      "user/information",
      config
    );

    return response.data;
  }

  logOut(): boolean {
    try {
      Cookies.remove(userTokenKey);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default UserService;
