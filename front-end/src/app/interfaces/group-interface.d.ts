import { IUser } from "./user-interface";

export interface IGroup {
  id: string;
  groupName: string;
  description: string;
  createdAt: Date;
  members: IUser[];
}
