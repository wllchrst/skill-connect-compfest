import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { ModelRepository } from './model.repository';

@Injectable()
export class UserRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly modelRepository: ModelRepository,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<boolean> {
    try {
      await this.databaseService.user.create({ data });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getUserFriends(userId: string) {
    try {
      const userFriendsData = await this.databaseService.friend.findMany({
        where: {
          userId: userId,
        },
      });

      const friendIds = userFriendsData.map((f) => f.friendId);

      const userFriends = await this.databaseService.user.findMany({
        where: {
          AND: [{ id: { in: friendIds } }, { id: { not: userId } }],
        },
      });

      return userFriends;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getUserRecommendation(userId: string): Promise<User[]> {
    try {
      const userInformation = await this.databaseService.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          friends: true,
        },
      });

      const userFriendsIds: string[] = userInformation.friends.map(
        (user) => user.friendId,
      );
      const friendIds =
        await this.modelRepository.getFriendRecommendationList(userId);

      const users = await this.databaseService.user.findMany({
        where: {
          AND: [{ id: { in: friendIds } }, { id: { notIn: userFriendsIds } }],
        },
      });

      return users;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getAllUser(): Promise<User[]> {
    try {
      const users = await this.databaseService.user.findMany({
        include: {
          friends: true,
          CourseInteraction: {
            include: {
              course: true,
            },
          },
        },
      });
      return users;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const user = await this.databaseService.user.findFirst({
        where: {
          id: id,
        },
        include: {
          friends: true,
        },
      });

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.databaseService.user.findFirst({
        where: {
          email: email,
        },
      });

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async userExists(id: string): Promise<boolean> {
    try {
      const user = await this.databaseService.user.findFirst({
        where: {
          id: id,
        },
      });

      return user ? true : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateUserData(
    data: Prisma.UserUpdateInput,
    userId: string,
  ): Promise<boolean> {
    try {
      await this.databaseService.user.update({
        where: {
          id: userId,
        },
        data: data,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
