import { Injectable } from '@nestjs/common';
import { Group, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/infrastructure/database/database.service';

@Injectable()
export class GroupRepository {
  constructor(private readonly databaseService: DatabaseService) {}
  async createGroup(data: Prisma.GroupCreateInput): Promise<boolean> {
    try {
      await this.databaseService.group.create({ data });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAllGroup(): Promise<Group[]> {
    try {
      const groups = await this.databaseService.group.findMany({
        include: {
          members: {
            include: {
              user: true,
            },
          },
        },
      });
      return groups;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getGroupById(id: string): Promise<Group | null> {
    try {
      const group = await this.databaseService.group.findFirst({
        where: {
          id: id,
        },
      });

      return group;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async addGroupMember(data: Prisma.GroupMemberCreateInput) {
    try {
      await this.databaseService.groupMember.create({ data });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async groupExists(id: string): Promise<boolean> {
    try {
      const group = await this.databaseService.group.findFirst({
        where: {
          id: id,
        },
      });

      return group ? true : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
