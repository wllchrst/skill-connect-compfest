import { IAddGroupMember } from "../interfaces/add-group-member-interface";
import { ICreateGroup } from "../interfaces/create-group-interface";
import { IGroup } from "../interfaces/group-interface";
import { IResponse } from "../interfaces/response-interface";
import BackendService from "./backend-service";

export default class GroupService extends BackendService {
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
