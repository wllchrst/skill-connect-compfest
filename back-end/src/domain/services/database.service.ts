import { Injectable } from '@nestjs/common';
import { DatabaseSeeder } from 'src/infrastructure/database/seeder';

@Injectable()
export class DatabaseAPIService {
  constructor(private readonly databaseSeeder: DatabaseSeeder) {}

  async seedUserData(): Promise<boolean> {
    return await this.databaseSeeder.seedUser();
  }

  async seedGroup() {
    await this.databaseSeeder.seedGroup();
  }

  async seedCourseData(): Promise<boolean> {
    await this.databaseSeeder.seedCourse();
    return true;
  }
}
