import BackendService from "@/app/service/backend-service";
import { ICreateUser } from "../interfaces/create-user-interface";
import { IResponse } from "../interfaces/response-interface";
import { ILoginUser } from "../interfaces/login-user-interface";
import { IUser } from "../interfaces/user-interface";
import { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { userTokenKey } from "../data/web-contant";
import { IAddFriend } from "../interfaces/add-friend-interface";
import FirebaseHelper from "../helpers/firebase-helper";
import { IChat } from "../interfaces/chat-interface";
import { v4 } from "uuid";
import { Timestamp } from "firebase/firestore";
import { chatFriendCollection } from "../config/firebase-config";

class UserService extends BackendService {
  static instance: UserService | null = null;
  firebaseHelper: FirebaseHelper = new FirebaseHelper();

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

  async updateUser(user: IUser): Promise<IResponse<boolean>> {
    const response = await this.patch<IResponse<boolean>>("user", user, {
      headers: {
        Authorization: `Bearer ${Cookies.get(userTokenKey)}`,
      },
    });
    return response.data;
  }

  async getUserInformation(token: string) {
    console.log("getting user information");
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

  async chatFriend(userId: string, friendId: string, message: string) {
    try {
      const chatData: IChat = {
        id: v4(),
        message: message,
        receiverId: friendId,
        senderId: userId,
        timestamp: Timestamp.fromDate(new Date()),
      };

      const result = await this.firebaseHelper.create<IChat>(
        chatFriendCollection,
        chatData
      );
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateUserInformation(user: IUser): Promise<IResponse<boolean>> {
    try {
      console.log("update user information");
      const response = await this.patch<IResponse<boolean>>("user", user);
      return response.data;
    } catch (error) {
      console.error(error);
      return {
        data: false,
        message: "Something went wrong",
        success: false,
      };
    }
  }

  async getFriendRecommendation(userId: string): Promise<IResponse<IUser[]>> {
    try {
      const response = await this.get<IResponse<IUser[]>>(
        `user/friend-recommendation/${userId}`
      );

      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return {
        data: [],
        message: "Something went wrong look at console",
        success: false,
      };
    }
  }

  async addFriend(addFriendData: IAddFriend): Promise<IResponse<boolean>> {
    const response = await this.post<IResponse<boolean>>(
      "friend",
      addFriendData
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
