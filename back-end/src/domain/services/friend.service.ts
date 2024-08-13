import { Injectable } from '@nestjs/common';
import { FriendRepository } from '../repositories/friend.repository';
import { UserRepository } from '../repositories/user.repository';
import { AddFriendDTO } from 'src/application/dtos/add-friend-dto';
import { IResponse } from 'src/application/interfaces/response-interface';
import { Helper } from 'src/common/helper';

@Injectable()
export class FriendService {
  constructor(
    private readonly friendRepository: FriendRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async addFriend(addFriendDTO: AddFriendDTO): Promise<IResponse<boolean>> {
    if (addFriendDTO.friendId == addFriendDTO.userId)
      return Helper.createResponse(
        false,
        'Cannot add yourself as friend',
        false,
      );

    const user = await this.userRepository.userExists(addFriendDTO.userId);
    const friend = await this.userRepository.userExists(addFriendDTO.friendId);

    if (user == null || friend == null) {
      const id = user == null ? addFriendDTO.userId : addFriendDTO.friendId;
      return Helper.createResponse(
        false,
        `There is no user with id ${id}`,
        false,
      );
    }

    const result = await this.friendRepository.addFriend({
      friend: {
        connect: {
          id: addFriendDTO.friendId,
        },
      },
      user: {
        connect: {
          id: addFriendDTO.userId,
        },
      },
    });

    const message = result ? 'Success adding friend' : 'Failed adding friend';

    return Helper.createResponse(result, message, result);
  }
}
