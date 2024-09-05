import { User } from '@prisma/client';

export interface GroupDTO {
  id: string;
  groupName: string;
  description: string;
  createdAt: Date;
  members: User[];
}
