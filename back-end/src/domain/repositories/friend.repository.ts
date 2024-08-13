import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { Prisma } from '@prisma/client';

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
}
