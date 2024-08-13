import { UserService } from 'src/domain/services/user.service';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { IResponse } from '../interfaces/response-interface';
import { Helper } from 'src/common/helper';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUser(): Promise<IResponse<User[]>> {
    return await this.userService.getAllUser();
  }

  @Post()
  async create(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<IResponse<boolean>> {
    console.log(createUserDTO);
    const validationResult = this.validateCreateUserDTO(createUserDTO);
    if (validationResult.length <= 0)
      return Helper.createResponse(false, validationResult, false);

    return this.userService.createUser(createUserDTO);
  }

  @Get(':id')
  async getUserById(@Param() param: any): Promise<IResponse<User>> {
    const userId = param.id;
    if (userId == undefined || userId == null)
      return Helper.createResponse(null, 'User Id cannot be null', false);
  }

  validateCreateUserDTO(dto: CreateUserDTO): string {
    const errors: string[] = [];

    // Validate name
    if (!dto.name || typeof dto.name !== 'string' || dto.name.length > 50) {
      errors.push(
        'Name must be a non-empty string with a maximum length of 50 characters.',
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!dto.email || !emailRegex.test(dto.email)) {
      errors.push('Email must be a valid email address.');
    }

    // Validate password
    if (
      !dto.password ||
      typeof dto.password !== 'string' ||
      dto.password.length < 8
    ) {
      errors.push('Password must be a string with at least 8 characters.');
    }

    // Validate profilePictureLink
    const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    if (!dto.profilePictureLink || !urlRegex.test(dto.profilePictureLink)) {
      errors.push('Profile picture link must be a valid URL.');
    }

    // Validate description (optional)
    if (
      dto.description &&
      (typeof dto.description !== 'string' || dto.description.length > 200)
    ) {
      errors.push(
        'Description must be a string with a maximum length of 200 characters.',
      );
    }

    return errors[0] ? errors[0] : '';
  }
}
