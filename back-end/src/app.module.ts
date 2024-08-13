import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './infrastructure/config/configuration';
import { UserModule } from './modules/user.module';
import { DatabaseService } from './infrastructure/database/database.service';
import { SharedModule } from './modules/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    UserModule,
    SharedModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
