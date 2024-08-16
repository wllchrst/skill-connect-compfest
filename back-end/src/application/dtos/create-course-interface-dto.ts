import { CourseInteractionType } from '../enumerations/interaction-type.enum';

export interface CreateCourseInteractionDTO {
  userId: string;
  courseId: string;
  interactionType: CourseInteractionType;
}
