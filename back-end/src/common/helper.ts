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

  static getRandomNumber(lower: number, upper: number): number {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  }

  static scaleNumber(
    value: number,
    oldMin: number,
    oldMax: number,
    newMin: number,
    newMax: number,
  ): number {
    const result = Math.floor(
      ((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin,
    );
    return result;
  }
}
