import { Injectable } from '@nestjs/common';
import { ChatRepository } from '../repositories/chat.repository';
import { UserRepository } from '../repositories/user.repository';
import { GroupRepository } from '../repositories/group.repository';
import { CreatePersonalChatDTO } from 'src/application/dtos/create-personal-chat-dto';
import { IResponse } from 'src/application/interfaces/response-interface';
import { Helper } from 'src/common/helper';
import { v4 } from 'uuid';
import { CreateGroupChatDTO } from 'src/application/dtos/create-group-chat-dto';
import { GroupChat, PersonalChat, User } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly userRepository: UserRepository,
    private readonly groupRepository: GroupRepository,
  ) {}

  async getGroupChatByGroupId(
    groupId: string,
  ): Promise<IResponse<GroupChat[]>> {
    const result = await this.chatRepository.getGroupChatById(groupId);
    return Helper.createResponse(
      result,
      `All group chat by id ${groupId}`,
      true,
    );
  }

  async getPersonalChatBySenderAndReceiver(
    senderId: string,
    receiverId: string,
  ): Promise<IResponse<PersonalChat[]>> {
    const result = await this.chatRepository.getPersonalChatBySenderAndReceiver(
      senderId,
      receiverId,
    );
    return Helper.createResponse(
      result,
      `All personal chat by sender id ${senderId} and receiver id ${receiverId}`,
      true,
    );
  }

  async createGroupChat(
    createGroupChat: CreateGroupChatDTO,
  ): Promise<IResponse<boolean>> {
    const userExists = this.userRepository.userExists(createGroupChat.senderId);
    const groupExists = this.groupRepository.groupExists(
      createGroupChat.groupId,
    );

    if (!userExists)
      return Helper.createResponse(false, 'User does not exists', false);
    else if (!groupExists)
      return Helper.createResponse(false, 'Group does not exists', false);

    const result = await this.chatRepository.createGroupChat({
      id: v4(),
      message: createGroupChat.message,
      Group: { connect: { id: createGroupChat.groupId } },
      Sender: { connect: { id: createGroupChat.senderId } },
    });

    return Helper.createResponse(
      result,
      result ? 'Create Group Chat Successful' : 'Create Group Chat Failed',
      result,
    );
  }

  async createPersonalChat(
    createPersonalChat: CreatePersonalChatDTO,
  ): Promise<IResponse<boolean>> {
    const senderExists = await this.userRepository.userExists(
      createPersonalChat.senderId,
    );

    const receiverExists = await this.userRepository.userExists(
      createPersonalChat.receiverId,
    );

    if (!receiverExists || !senderExists)
      return Helper.createResponse(
        false,
        'Sender or receiver doest not exists',
        false,
      );

    const result = await this.chatRepository.createPersonalChat({
      id: v4(),
      message: createPersonalChat.message,
      Receiver: { connect: { id: createPersonalChat.receiverId } },
      Sender: { connect: { id: createPersonalChat.senderId } },
    });

    return Helper.createResponse(
      result,
      result
        ? 'Create Personal Chat Successful'
        : 'Create Personal Chat Failed',
      result,
    );
  }
}
