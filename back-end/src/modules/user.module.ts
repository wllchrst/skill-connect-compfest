import { forwardRef, Module } from '@nestjs/common';
import { UserController } from 'src/application/controllers/user.controller';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserService } from 'src/domain/services/user.service';
import { SharedModule } from './shared.module';
import AuthModule from './auth.module';

@Module({
  imports: [forwardRef(() => AuthModule), SharedModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
