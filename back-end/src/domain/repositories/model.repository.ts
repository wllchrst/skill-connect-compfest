import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ModelRepository {
  basePath: string = process.env.MODEL_BACKEND_URL
    ? process.env.MODEL_BACKEND_URL
    : 'http://localhost:8000/';
  async getFriendRecommendationList(userId: string): Promise<string[]> {
    try {
      const result = await axios.post(this.basePath + 'friend-recommendation', {
        user_id: userId,
      });
      return result.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async trainFriendRecommendationModel() {
    try {
      await axios.get(this.basePath + 'train/friend-recommendation');
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // http://localhost:8000/course_recommendation?user_id=f94b9a6d-b6a3-4836-882b-d7c772838a94
  async getCourseRecommendation(user_id: string): Promise<string[]> {
    try {
      const result = await axios.get<string[]>(
        this.basePath + `course_recommendation?user_id=${user_id}`,
      );

      return result.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // http://localhost:8000/search/?query=Machine
  async searchCourse(searchQuery: string): Promise<string[]> {
    try {
      const result = await axios.get(
        this.basePath + `search/?query=${searchQuery}`,
      );

      return result.data.course_ids;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
