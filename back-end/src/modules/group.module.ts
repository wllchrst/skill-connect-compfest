import { Module } from '@nestjs/common';
import { SharedModule } from './shared.module';
import { GroupRepository } from 'src/domain/repositories/group.repository';
import { GroupService } from 'src/domain/services/group.service';
import { GroupController } from 'src/application/controllers/group.controller';
import { UserModule } from './user.module';

@Module({
  imports: [SharedModule, UserModule],
  controllers: [GroupController],
  providers: [GroupRepository, GroupService],
  exports: [GroupRepository, GroupService],
})
export class GroupModule {}
