import { CourseInteractionType } from './../enumerations/interaction-type.enum';
import { CreateCourseInteractionDTO } from './../dtos/create-course-interface-dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCrouseDTO } from '../dtos/create-course-dto';
import { CourseService } from 'src/domain/services/course.service';
import { Helper } from 'src/common/helper';
import { IResponse } from '../interfaces/response-interface';
import { Course } from '@prisma/client';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  validateCourseCreation(course: CreateCrouseDTO): string {
    // Validate title (required and must be a string)
    if (typeof course.title !== 'string' || course.title.trim() === '') {
      return 'Invalid or missing "title".';
    }

    // Validate description (required and must be a string)
    if (
      typeof course.description !== 'string' ||
      course.description.trim() === ''
    ) {
      return 'Invalid or missing "description".';
    }

    // Validate level (required and must be a number)
    if (typeof course.level !== 'number' || isNaN(course.level)) {
      return 'Invalid or missing "level".';
    }

    // Validate rating (required and must be a number)
    if (typeof course.rating !== 'number' || isNaN(course.rating)) {
      return 'Invalid or missing "rating".';
    }

    // Validate link (required and must be a string, possibly a URL)
    if (typeof course.link !== 'string' || course.link.trim() === '') {
      return 'Invalid or missing "link".';
    }

    // Validate image (required and must be a string, possibly a URL)
    if (typeof course.image !== 'string' || course.image.trim() === '') {
      return 'Invalid or missing "image".';
    }

    // If all validations pass
    return 'Validation successful';
  }

  @Get()
  async getAllCourse(): Promise<IResponse<Course[]>> {
    return this.courseService.getAllCourse();
  }

  @Post()
  async createCourse(@Body() createCourseDTO: CreateCrouseDTO) {
    const validationResult = this.validateCourseCreation(createCourseDTO);

    if (validationResult != '')
      return Helper.createResponse(false, validationResult, false);

    return await this.courseService.createCourse(createCourseDTO);
  }

  // @Post('batch')
  // async createCourseBatch(@Body() createCourseDtos: CreateCrouseDTO[]) {
  //   for (const createCourseDTO of createCourseDtos) {
  //     const validationResult = this.validateCourseCreation(createCourseDTO);
  //     if (validationResult != '')
  //       return Helper.createResponse(false, validationResult, false);
  //   }

  //   return await this.courseService.createBatch(createCourseDtos);
  // }

  @Post('interaction')
  async createCourseInteraction(
    @Body() createCourseInteractionDTO: CreateCourseInteractionDTO,
  ): Promise<IResponse<boolean>> {
    const interactionType = createCourseInteractionDTO.interactionType;

    if (
      interactionType != CourseInteractionType.Click &&
      interactionType != CourseInteractionType.Like &&
      interactionType != CourseInteractionType.Share
    )
      return Helper.createResponse(
        false,
        "Interaction must be 'Like' or 'Click' or 'Share'",
        false,
      );

    return await this.courseService.createCourseInteraction(
      createCourseInteractionDTO,
    );
  }
}
