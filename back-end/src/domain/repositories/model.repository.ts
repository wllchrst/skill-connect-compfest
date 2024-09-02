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
}
