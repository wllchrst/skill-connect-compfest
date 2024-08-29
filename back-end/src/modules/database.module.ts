import { Module } from '@nestjs/common';
import { SharedModule } from './shared.module';
import { DatabaseController } from 'src/application/controllers/database.controller';
import { DatabaseSeeder } from 'src/infrastructure/database/seeder';
import { DatabaseAPIService } from 'src/domain/services/database.service';

@Module({
  imports: [SharedModule],
  controllers: [DatabaseController],
  providers: [DatabaseSeeder, DatabaseAPIService],
})
export class DatabaseModule {}
