import { Module } from '@nestjs/common';
import { UserController } from 'src/application/controllers/user.controller';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserService } from 'src/domain/services/user.service';
import { SharedModule } from './shared.module';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
