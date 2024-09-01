import { Injectable } from '@nestjs/common';
import { GroupChat, PersonalChat, Prisma } from '@prisma/client';
import { IResponse } from 'src/application/interfaces/response-interface';
import { DatabaseService } from 'src/infrastructure/database/database.service';

@Injectable()
export class ChatRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getPersonalChatBySenderAndReceiver(
    senderIdInput: string,
    receiverIdInput: string,
  ): Promise<PersonalChat[]> {
    try {
      const result = await this.databaseService.personalChat.findMany({
        where: {
          OR: [
            {
              senderId: senderIdInput,
              receiverId: receiverIdInput,
            },
            {
              receiverId: receiverIdInput,
              senderId: senderIdInput,
            },
          ],
        },
      });

      return result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getGroupChatById(groupId: string): Promise<GroupChat[]> {
    try {
      const result = await this.databaseService.groupChat.findMany({
        where: { groupId: groupId },
      });

      return result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async createPersonalChat(data: Prisma.PersonalChatCreateInput) {
    try {
      await this.databaseService.personalChat.create({ data });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async createGroupChat(data: Prisma.GroupChatCreateInput) {
    try {
      await this.databaseService.groupChat.create({ data });
      return true;
    } catch (error) {
      console.error(error);
    }
  }
}
