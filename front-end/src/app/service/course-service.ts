import { ICourse } from "../interfaces/course-interface";
import { IResponse } from "../interfaces/response-interface";
import BackendService from "./backend-service";

export class CourseService extends BackendService {
  constructor() {
    super();
  }

  async getCourseRecommendation(userId: string): Promise<IResponse<ICourse[]>> {
    const response = await this.get<IResponse<ICourse[]>>(
      `course/course-recommendation/${userId}`
    );
    console.log(response.data);
    return response.data;
  }

  async searchCourse(query: string): Promise<IResponse<ICourse[]>> {
    const response = await this.get<IResponse<ICourse[]>>(
      `course/search-course/${query}`
    );

    console.log(response.data);
    return response.data;
  }
}
