import { Body, Controller, Post } from '@nestjs/common';
import { FriendService } from 'src/domain/services/friend.service';
import { AddFriendDTO } from '../dtos/add-friend-dto';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post()
  async addFriend(@Body() addFriendDTO: AddFriendDTO) {
    console.log(addFriendDTO);
    return await this.friendService.addFriend(addFriendDTO);
  }
}
