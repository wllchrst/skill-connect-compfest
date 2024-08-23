import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import AuthModule from './auth.module';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class SharedModule {}
