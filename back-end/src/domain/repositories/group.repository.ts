import { Injectable } from '@nestjs/common';
import { Group, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { ModelRepository } from './model.repository';

@Injectable()
export class GroupRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly modelRepository: ModelRepository,
  ) {}
  async createGroup(data: Prisma.GroupCreateInput): Promise<Group | null> {
    try {
      await this.databaseService.group.create({ data });
      const group = await this.databaseService.group.findFirst({
        where: {
          id: data.id,
        },
      });
      return group;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getGroupRecommendation(userId: string): Promise<Group[]> {
    const userIds =
      await this.modelRepository.getFriendRecommendationList(userId);

    // find group that has this user ids

    const groups = await this.databaseService.group.findMany({
      where: {
        members: {
          every: { userId: { in: userIds } },
        },
      },
    });

    return groups;
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
