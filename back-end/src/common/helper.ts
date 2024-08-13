import { Response } from 'src/application/interfaces/response-interface';

export class Helper {
  static createResponse<T>(
    data: T,
    message: string,
    success: boolean,
  ): Response<T> {
    return {
      data: data,
      message: message,
      success: success,
    };
  }
}
