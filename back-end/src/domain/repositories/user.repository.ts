import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/infrastructure/database/database.service';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: Prisma.UserCreateInput): Promise<boolean> {
    try {
      await this.databaseService.user.create({ data });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getAllUser() {}

  async getUserById() {}
}
