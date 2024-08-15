import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class FriendRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async addFriend(data: Prisma.FriendCreateInput) {
    try {
      await this.databaseService.friend.create({ data });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async isAlreadyFriend(userId: string, friendId: string): Promise<boolean> {
    console.log('is already friend');
    try {
      const user = await this.databaseService.friend.findFirst({
        where: {
          userId: userId,
          friendId: friendId,
        },
      });
      if (user == null || user == undefined) return false;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
