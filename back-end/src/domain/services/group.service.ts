import { Injectable } from '@nestjs/common';
import { GroupRepository } from '../repositories/group.repository';
import { CreateGroupDTO } from 'src/application/dtos/create-group.dto';
import { v4 } from 'uuid';
import { Helper } from 'src/common/helper';
import { IResponse } from 'src/application/interfaces/response-interface';
import { Group } from '@prisma/client';
import { CreateGroupMemberDTO } from 'src/application/dtos/create-group-member.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getAllGroup(): Promise<IResponse<Group[]>> {
    const groups = await this.groupRepository.getAllGroup();
    return Helper.createResponse(groups, '', true);
  }

  async createGroup(
    createGroupDTO: CreateGroupDTO,
  ): Promise<IResponse<boolean>> {
    const result = await this.groupRepository.createGroup({
      id: v4(),
      groupName: createGroupDTO.groupName,
      description: createGroupDTO.description,
    });

    const message = result ? 'Success creating group' : 'Failed creating group';

    return Helper.createResponse(result, message, result);
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
