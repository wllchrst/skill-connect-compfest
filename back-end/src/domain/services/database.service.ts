import { Injectable } from '@nestjs/common';
import { DatabaseSeeder } from 'src/infrastructure/database/seeder';

@Injectable()
export class DatabaseAPIService {
  constructor(private readonly databaseSeeder: DatabaseSeeder) {}

  async seedUserData(): Promise<boolean> {
    return await this.databaseSeeder.seedUser();
  }
}
