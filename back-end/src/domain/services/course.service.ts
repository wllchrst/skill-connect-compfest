import { CreateCourseInteractionDTO } from './../../application/dtos/create-course-interface-dto';
import { Injectable } from '@nestjs/common';
import { CourseRepository } from '../repositories/course.repository';
import { CreateCrouseDTO } from 'src/application/dtos/create-course-dto';
import { v4 } from 'uuid';
import { IResponse } from 'src/application/interfaces/response-interface';
import { Helper } from 'src/common/helper';
import { Course, Prisma } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository';
import { ModelRepository } from '../repositories/model.repository';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly userRepository: UserRepository,
    private readonly modelRepository: ModelRepository,
  ) {}

  async createCourse(
    createCrouseDTO: CreateCrouseDTO,
  ): Promise<IResponse<boolean>> {
    const result = await this.courseRepository.createCourse({
      id: v4(),
      title: createCrouseDTO.title,
      description: createCrouseDTO.description,
      level: createCrouseDTO.level,
      link: createCrouseDTO.link,
      image: createCrouseDTO.image,
      rating: createCrouseDTO.rating,
    });

    const message = result
      ? 'Successfully created course'
      : 'Failed created course';

    return Helper.createResponse(result, message, result);
  }

  async createCourseInteraction(
    createCourseInteractionDTO: CreateCourseInteractionDTO,
  ): Promise<IResponse<boolean>> {
    const userExists = await this.userRepository.userExists(
      createCourseInteractionDTO.userId,
    );

    const courseExists = await this.courseRepository.courseExists(
      createCourseInteractionDTO.courseId,
    );

    if (!userExists)
      return Helper.createResponse(
        false,
        `There is no user with id ${createCourseInteractionDTO.userId}`,
        false,
      );
    else if (!courseExists)
      return Helper.createResponse(
        false,
        `There is no course with id ${createCourseInteractionDTO.courseId}`,
        false,
      );

    const result = await this.courseRepository.createCourseInteraction({
      id: v4(),
      course: {
        connect: {
          id: createCourseInteractionDTO.courseId,
        },
      },
      user: {
        connect: {
          id: createCourseInteractionDTO.userId,
        },
      },
      interactionType: createCourseInteractionDTO.interactionType,
    });

    const message = result
      ? 'Successfully created course interaction'
      : 'Failed created course interaction';

    return Helper.createResponse(result, message, result);
  }

  async getAllCourse(): Promise<IResponse<Course[]>> {
    const courses = await this.courseRepository.getAllCourse();
    return Helper.createResponse(courses, 'All Course', true);
  }

  async getCourseRecommendation(userId: string): Promise<IResponse<Course[]>> {
    const userExists = await this.userRepository.userExists(userId);

    if (!userExists)
      return Helper.createResponse(
        [],
        "User doesn't exist in our database",
        false,
      );

    const courses = await this.courseRepository.getCourseRecommendation(userId);

    return Helper.createResponse(courses, 'Course Recommendation', true);
  }

  async searchCourse(query: string): Promise<IResponse<Course[]>> {
    const courses = await this.courseRepository.searchCourse(query);

    return Helper.createResponse(courses, 'Course Searching', true);
  }
}
