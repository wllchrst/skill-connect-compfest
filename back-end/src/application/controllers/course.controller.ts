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

  validateCourseCreation(createCourseDTO: CreateCrouseDTO): string {
    var message = '';

    if (
      createCourseDTO.courseDescription == null ||
      createCourseDTO == undefined ||
      createCourseDTO.courseLink == null ||
      createCourseDTO.courseLink == undefined ||
      createCourseDTO.courseName == null ||
      createCourseDTO.courseName == undefined ||
      createCourseDTO.coursePrice == null ||
      createCourseDTO.coursePrice == undefined
    )
      message = 'Every field is required';
    else if (createCourseDTO.courseLink == '')
      message = 'Course Link cannot be empty';
    else if (createCourseDTO.courseName == '')
      message = 'Course Name cannot be empty';
    else if (createCourseDTO.coursePrice <= 0)
      message = 'Course price cannot be less than 0';
    else if (createCourseDTO.courseDescription == '')
      message = 'Course Description cannot be empty';

    return message;
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

  @Post('batch')
  async createCourseBatch(@Body() createCourseDtos: CreateCrouseDTO[]) {
    for (const createCourseDTO of createCourseDtos) {
      const validationResult = this.validateCourseCreation(createCourseDTO);
      if (validationResult != '')
        return Helper.createResponse(false, validationResult, false);
    }

    return await this.courseService.createBatch(createCourseDtos);
  }

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
