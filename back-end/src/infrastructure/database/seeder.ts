import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Course, Prisma } from '@prisma/client';
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
import * as fs from 'fs';
import * as Papa from 'papaparse';
import { title } from 'process';

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
      interestType,
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
      dateOfBirth: faker.date.past({ years: 20 }),
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

      const defaultUser: Prisma.UserCreateInput = users[0];
      defaultUser.email = 'test@gmail.com';
      defaultUser.name = 'William Christian';
      defaultUser.password = 'test123';

      await this.databaseService.user.createMany({ data: users });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async seedGroup() {
    const amount = 20;
    const userAmount = 10;

    const groups: Prisma.GroupCreateInput[] = [];

    for (let i = 0; i < amount; i++) {
      const groupInput: Prisma.GroupCreateInput = {
        id: faker.string.uuid(),
        groupName: faker.company.name(),
        description: faker.company.catchPhrase(),
      };

      groups.push(groupInput);
    }

    await this.databaseService.group.createMany({ data: groups });

    const users = await this.databaseService.user.findMany();
    const groupsSeeded = await this.databaseService.group.findMany();

    for (const seededGroup of groupsSeeded) {
      for (let i = 0; i < userAmount; i++) {
        const index = Helper.getRandomNumber(0, users.length - 1);
        await this.databaseService.groupMember.create({
          data: {
            id: v4(),
            groupId: seededGroup.id,
            userId: users[index].id,
          },
        });
      }
    }
  }

  async seedCourse() {
    // Read the CSV file
    const csvFile = fs.readFileSync(
      'src/infrastructure/database/data/final_courses_data.csv',
      'utf8',
    );

    const BATCH_SIZE = 1000;

    // Parse the CSV file
    Papa.parse(csvFile, {
      header: true, // Assumes the CSV has headers
      complete: async (results) => {
        // Convert the parsed data to the Course type
        const courses: Prisma.CourseCreateInput[] = results.data.map(
          (item: any) => ({
            id: item.id,
            link: item.link,
            title: item.title,
            rating: parseFloat(item.rating) ? parseFloat(item.rating) : 0,
            description: '', //item.description,
            level: parseFloat(item.level),
            image: item.image,
          }),
        );

        // Function to handle batch creation
        const batchInsert = async (courses: Prisma.CourseCreateInput[]) => {
          for (let i = 0; i < courses.length; i += BATCH_SIZE) {
            const batch = courses.slice(i, i + BATCH_SIZE);
            try {
              await this.databaseService.course.createMany({
                data: batch,
              });
            } catch (error) {
              console.error(
                `Error inserting batch starting at index ${i}`,
                error,
              );
            }
          }
        };

        try {
          await batchInsert(courses);
          console.log('All batches inserted successfully');
        } catch (error) {
          console.error('Failed to insert all batches:', error);
        }
      },
      skipEmptyLines: true, // Skip empty lines
    });
  }
}
