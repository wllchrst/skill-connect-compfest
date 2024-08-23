import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from 'src/application/controllers/auth.controller';
import { AuthService } from 'src/domain/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/application/guards/auth.guard';
import { UserModule } from './user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export default class AuthModule {}
