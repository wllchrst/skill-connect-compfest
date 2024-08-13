import { UserService } from 'src/domain/services/user.service';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { IResponse } from '../interfaces/response-interface';
import { Helper } from 'src/common/helper';
import { CreateUserDTO, validateCreateUserDTO } from '../dtos/create-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getAllUser(): IResponse<string> {
    return Helper.createResponse('testing', 'testing', false);
  }

  @Post()
  async create(
    @Body() createUserDTO: CreateUserDTO,
    @Res() response: Response,
  ): Promise<IResponse<boolean>> {
    const validationResult = validateCreateUserDTO(createUserDTO);
    if (validationResult.length <= 0)
      return Helper.createResponse(false, validationResult, false);

    const creationResult = await this.userService.createUser(createUserDTO);
    if (creationResult) response.status(HttpStatus.CREATED);

    const message = creationResult
      ? 'Success creating user'
      : 'Failed creating user';

    return Helper.createResponse<boolean>(
      creationResult,
      message,
      creationResult,
    );
  }
}
