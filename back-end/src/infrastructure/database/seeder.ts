import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';
import { DatabaseService } from './database.service';
import { v4 } from 'uuid';
import { Helper } from 'src/common/helper';
import { educationTypes } from 'src/application/types/education-data-types';
import { Setting } from 'src/common/setting';
import {
  humanLanguages,
  interestType,
  learningResources,
  toolTypes,
} from 'src/application/types/user-data-types';

@Injectable()
export class DatabaseSeeder {
  constructor(private readonly databaseService: DatabaseService) {}

  createSelection(selections: string[], amountSet: number = -1): string {
    const amount =
      amountSet == -1
        ? Helper.getRandomNumber(1, selections.length)
        : amountSet;
    var result: string[] = [];
    var counter = 0;

    while (counter < amount) {
      const index = Helper.getRandomNumber(0, selections.length);

      const choice = selections[index];

      if (choice == '') continue;

      if (!result.includes(choice)) {
        result.push(choice);
        counter++;
      }
    }

    return result.join(';');
  }

  createUserSeed(): Prisma.UserCreateInput {
    const level = Helper.getRandomNumber(
      Setting.lowerScale,
      Setting.upperScale,
    );
    const education =
      educationTypes[
        Helper.scaleNumber(
          level,
          Setting.lowerScale,
          Setting.upperScale,
          0,
          educationTypes.length,
        )
      ];

    console.log(education);
    const experienceYears = Helper.scaleNumber(
      level,
      Setting.lowerScale,
      Setting.upperScale,
      0,
      5,
    );
    const tools = this.createSelection(toolTypes);
    const learningResource = this.createSelection(learningResources);
    const interest = this.createSelection(interestType);
    const language =
      humanLanguages[Helper.getRandomNumber(0, humanLanguages.length)];
    const skill = this.createSelection(
      learningResources,
      Helper.scaleNumber(
        level,
        Setting.lowerScale,
        Setting.upperScale,
        0,
        learningResources.length,
      ),
    );

    return {
      email: faker.internet.email(),
      id: v4(),
      name: faker.person.fullName(),
      password: faker.string.uuid(),
      currentEducation: education,
      dateOfBirth: faker.date.past(20),
      profilePicture: '',
      description: '',
      experienceYears: experienceYears,
      tools: tools,
      skill: skill,
      interest: interest,
      language: language,
      learningResource: learningResource,
    };
  }

  async seedUser() {
    try {
      const seedNumber = 200;
      const users: Prisma.UserCreateInput[] = [];

      for (let i = 0; i < seedNumber; i++) {
        users.push(this.createUserSeed());
      }

      await this.databaseService.user.createMany({ data: users });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
