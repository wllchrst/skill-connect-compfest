import { Injectable } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { ModelRepository } from './model.repository';

@Injectable()
export class CourseRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly modelRepository: ModelRepository,
  ) {}

  async createCourse(data: Prisma.CourseCreateInput): Promise<boolean> {
    try {
      await this.databaseService.course.create({ data });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async createBatchCourse(data: Prisma.CourseCreateInput[]): Promise<boolean> {
    try {
      this.databaseService.course.createMany({ data });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAllCourse(): Promise<Course[]> {
    try {
      const courses = await this.databaseService.course.findMany({
        include: {
          CourseInteraction: {
            include: {
              user: true,
            },
          },
        },
      });
      return courses;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getCourseById(id: string): Promise<Course | null> {
    try {
      const course = await this.databaseService.course.findFirst({
        where: {
          id: id,
        },
      });
      return course;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createCourseInteraction(data: Prisma.CourseInteractionCreateInput) {
    try {
      await this.databaseService.courseInteraction.create({ data });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async courseExists(courseId: string) {
    try {
      const course = await this.databaseService.course.findFirst({
        where: {
          id: courseId,
        },
      });
      if (course == null || course == undefined) return false;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getCourseRecommendation(userId: string): Promise<Course[]> {
    try {
      const courseIds =
        await this.modelRepository.getCourseRecommendation(userId);

      const ids = courseIds.slice(0, 100);

      const courses = await this.databaseService.course.findMany({
        where: {
          id: { in: ids },
        },
      });

      return courses;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async searchCourse(query: string): Promise<Course[]> {
    try {
      const courseIds = await this.modelRepository.searchCourse(query);

      const courses = await this.databaseService.course.findMany({
        where: {
          id: { in: courseIds },
        },
      });

      console.log(courses);

      return courses;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
