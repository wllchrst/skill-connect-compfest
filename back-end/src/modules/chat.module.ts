import { Module } from '@nestjs/common';
import { ChatController } from 'src/application/controllers/chat.controller';
import { SharedModule } from './shared.module';
import { ChatRepository } from 'src/domain/repositories/chat.repository';
import { ChatService } from 'src/domain/services/chat.service';
import { UserModule } from './user.module';
import { GroupModule } from './group.module';

@Module({
  imports: [SharedModule, UserModule, GroupModule],
  controllers: [ChatController],
  providers: [ChatRepository, ChatService],
  exports: [ChatRepository, ChatService],
})
export class ChatModule {}
