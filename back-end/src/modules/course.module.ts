import { Module } from '@nestjs/common';
import { SharedModule } from './shared.module';
import { CourseRepository } from 'src/domain/repositories/course.repository';
import { CourseService } from 'src/domain/services/course.service';
import { CourseController } from 'src/application/controllers/course.controller';
import { UserModule } from './user.module';

@Module({
  imports: [SharedModule, UserModule],
  controllers: [CourseController],
  providers: [CourseRepository, CourseService],
  exports: [CourseRepository, CourseService],
})
export class CourseModule {}
