import { chatGroupCollection } from "../config/firebase-config";
import FirebaseHelper from "../helpers/firebase-helper";
import { IAddGroupMember } from "../interfaces/add-group-member-interface";
import { IChatGroup } from "../interfaces/chat-group-interface";
import { ICreateGroup } from "../interfaces/create-group-interface";
import { IGroup } from "../interfaces/group-interface";
import { IResponse } from "../interfaces/response-interface";
import BackendService from "./backend-service";

export default class GroupService extends BackendService {
  firebaseHelper: FirebaseHelper = new FirebaseHelper();
  constructor() {
    super();
  }

  async createGroup(
    createGroup: ICreateGroup,
    creatorId: string
  ): Promise<IResponse<IGroup | null | boolean>> {
    const response = await this.post<IResponse<IGroup | null>>(
      "group",
      createGroup
    );

    const data = response.data;

    if (!data.success) return data;
    else if (data.data == null) return data;

    const addingMemberResult = await this.addGroupMember({
      groupId: data.data?.id,
      userId: creatorId,
    });

    return addingMemberResult;
  }

  async chatGroup(data: IChatGroup) {
    try {
      const result = await this.firebaseHelper.create<IChatGroup>(
        chatGroupCollection,
        data
      );
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async addGroupMember(addGroupMember: IAddGroupMember) {
    const response = await this.post<IResponse<boolean>>(
      "group/member",
      addGroupMember
    );
    return response.data;
  }

  async getGroupRecommendation(userId: string) {
    const response = await this.get<IResponse<IGroup[]>>(
      `group/recommendation/${userId}`
    );

    return response.data;
  }
}
