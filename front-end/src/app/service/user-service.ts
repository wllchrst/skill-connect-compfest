import BackendService from "@/app/service/backend-service";
import { ICreateUser } from "../interfaces/create-user-interface";
import { IResponse } from "../interfaces/response-interface";
import { ILoginUser } from "../interfaces/login-user-interface";

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
}

export default UserService;
