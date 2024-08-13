import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/database/database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class SharedModule {}
