import { ConsoleLogger, Injectable } from '@nestjs/common';
import { GroupRepository } from '../repositories/group.repository';
import { CreateGroupDTO } from 'src/application/dtos/create-group.dto';
import { v4 } from 'uuid';
import { Helper } from 'src/common/helper';
import { IResponse } from 'src/application/interfaces/response-interface';
import { Group } from '@prisma/client';
import { CreateGroupMemberDTO } from 'src/application/dtos/create-group-member.dto';
import { UserRepository } from '../repositories/user.repository';
import { GroupDTO } from 'src/application/dtos/group-dto';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getGroupRecommendation(userId: string): Promise<IResponse<GroupDTO[]>> {
    const userExists = await this.userRepository.userExists(userId);

    if (!userExists) {
      const message = `User with the id ${userId} does not exists`;
      return Helper.createResponse([], message, false);
    }

    const recommendedGroups =
      await this.groupRepository.getGroupRecommendation(userId);

    const allGroup = await this.groupRepository.getAllGroup();

    if (recommendedGroups.length < 20) {
      const deficit = 20 - recommendedGroups.length;

      // Filter out groups from allGroup that are not already in recommendedGroups
      const additionalGroups = allGroup.filter(
        (group) =>
          !recommendedGroups.some(
            (recommendedGroup) => recommendedGroup.id === group.id,
          ),
      );

      // Add the required number of groups from additionalGroups to recommendedGroups
      const groupsToAdd = additionalGroups.slice(0, deficit);

      // Concatenate the additional groups
      const finalGroups = recommendedGroups.concat(groupsToAdd);

      const returnGroups: GroupDTO[] = [];

      for (const group of finalGroups) {
        returnGroups.push({
          createdAt: group.createdAt,
          description: group.description,
          groupName: group.groupName,
          id: group.id,
          members: await this.groupRepository.getGroupMember(group.id),
        });
      }

      return Helper.createResponse(returnGroups, 'Recommended Groups', true);
    }

    const returnGroups: GroupDTO[] = [];

    for (const group of recommendedGroups) {
      returnGroups.push({
        createdAt: group.createdAt,
        description: group.description,
        groupName: group.groupName,
        id: group.id,
        members: await this.groupRepository.getGroupMember(group.id),
      });
    }

    return Helper.createResponse(returnGroups, 'Recommended Groups', true);
  }

  async getAllGroup(): Promise<IResponse<Group[]>> {
    const groups = await this.groupRepository.getAllGroup();
    return Helper.createResponse(groups, '', true);
  }

  async createGroup(
    createGroupDTO: CreateGroupDTO,
  ): Promise<IResponse<Group | null>> {
    const result = await this.groupRepository.createGroup({
      id: v4(),
      groupName: createGroupDTO.groupName,
      description: createGroupDTO.description,
    });

    const message =
      result != null ? 'Success creating group' : 'Failed creating group';

    return Helper.createResponse(result, message, result != null);
  }

  async addGroupMember(
    createGroupMemberDTO: CreateGroupMemberDTO,
  ): Promise<IResponse<boolean>> {
    const groupExist = await this.groupRepository.groupExists(
      createGroupMemberDTO.groupId,
    );

    const userExists = await this.userRepository.userExists(
      createGroupMemberDTO.userId,
    );

    if (!userExists) {
      const message = `User with the id ${createGroupMemberDTO.userId} does not exists`;
      return Helper.createResponse(false, message, false);
    } else if (!groupExist) {
      const message = `Group with the id ${createGroupMemberDTO.groupId} does not exists`;
      return Helper.createResponse(false, message, false);
    }

    const result = await this.groupRepository.addGroupMember({
      id: v4(),
      user: {
        connect: {
          id: createGroupMemberDTO.userId,
        },
      },
      group: {
        connect: {
          id: createGroupMemberDTO.groupId,
        },
      },
    });

    const message = result
      ? 'Success adding group member'
      : 'Failed adding group member';

    return Helper.createResponse(result, message, result);
  }
}
