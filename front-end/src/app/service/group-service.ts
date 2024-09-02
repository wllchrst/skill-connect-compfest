import { IAddGroupMember } from "../interfaces/add-group-member-interface";
import { ICreateGroup } from "../interfaces/create-group-interface";
import BackendService from "./backend-service";

export default class GroupService extends BackendService {
  constructor() {
    super();
  }

  async createGroup(createGroup: ICreateGroup) {
    const response = await this.post("group", createGroup);
    return response.data;
  }

  async addGroupMember(addGroupMember: IAddGroupMember) {
    const response = await this.post("group/member", addGroupMember);
    return response.data;
  }
}
