import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import AuthModule from './auth.module';
import { ModelRepository } from 'src/domain/repositories/model.repository';

@Module({
  providers: [DatabaseService, ModelRepository],
  exports: [DatabaseService, ModelRepository],
})
export class SharedModule {}
