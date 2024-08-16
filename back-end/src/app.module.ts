import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './infrastructure/config/configuration';
import { UserModule } from './modules/user.module';
import { SharedModule } from './modules/shared.module';
import { GroupModule } from './modules/group.module';
import { FriendModule } from './modules/friend.module';
import { CourseModule } from './modules/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    UserModule,
    GroupModule,
    FriendModule,
    SharedModule,
    CourseModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
