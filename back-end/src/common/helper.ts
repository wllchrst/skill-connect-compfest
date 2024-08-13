import { IResponse } from 'src/application/interfaces/response-interface';

export class Helper {
  static createResponse<T>(
    data: T,
    message: string,
    success: boolean,
  ): IResponse<T> {
    return {
      data: data,
      message: message,
      success: success,
    };
  }
}
