import { Injectable } from '@nestjs/common';
import { Group, Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { ModelRepository } from './model.repository';
import { GroupDTO } from 'src/application/dtos/group-dto';

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

    const groups = await this.databaseService.group.findMany({
      where: {
        members: {
          every: { userId: { in: userIds } },
        },
      },
    });

    console.log(groups.length);

    return groups;
  }

  async getGroupMember(groupId: string): Promise<User[]> {
    const group = await this.databaseService.group.findFirst({
      where: { id: groupId },
      include: {
        members: {
          include: { user: true },
        },
      },
    });

    const members = group.members.map((member, index) => member.user);

    return members;
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
