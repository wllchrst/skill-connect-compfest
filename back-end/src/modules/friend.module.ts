import { Module } from '@nestjs/common';
import { SharedModule } from './shared.module';
import { FriendController } from 'src/application/controllers/friend.controller';
import { FriendRepository } from 'src/domain/repositories/friend.repository';
import { FriendService } from 'src/domain/services/friend.service';
import { UserModule } from './user.module';

@Module({
  imports: [SharedModule, UserModule],
  controllers: [FriendController],
  providers: [FriendRepository, FriendService],
  exports: [FriendRepository, FriendService],
})
export class FriendModule {}
