import { Controller, Get } from '@nestjs/common';
import { DatabaseAPIService } from 'src/domain/services/database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseAPIService) {}

  @Get('course')
  async seedCourse() {
    return await this.databaseService.seedCourseData();
  }

  @Get('user')
  async seedUser() {
    try {
      await this.databaseService.seedUserData();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
