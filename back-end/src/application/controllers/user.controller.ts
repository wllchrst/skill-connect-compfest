import { UpdateUserDTO } from './../dtos/update-user-dto';
import { UserService } from 'src/domain/services/user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { IResponse } from '../interfaces/response-interface';
import { Helper } from 'src/common/helper';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { User } from '@prisma/client';
import {
  interestType,
  learningResources,
  toolTypes,
} from '../types/user-data-types';
import { AuthGuard } from '../guards/auth.guard';
import { UserDTO } from '../dtos/user-dto';
import { IUserPayload } from '../interfaces/user-payload-interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllUser(): Promise<IResponse<User[]>> {
    return await this.userService.getAllUser();
  }

  @UseGuards(AuthGuard)
  @Get('information')
  async getUserInformation(@Request() req): Promise<IResponse<UserDTO | null>> {
    const userPayload = req.userPayload as IUserPayload;
    if (userPayload == undefined || userPayload == null)
      return Helper.createResponse(null, 'Something went wrong', false);

    const { data } = await this.userService.getUserById(userPayload.id);
    if (data == null)
      return Helper.createResponse(null, 'User was not found', false);

    return Helper.createResponse(
      {
        id: data.id,
        currentEducation: data.currentEducation,
        dateOfBirth: data.dateOfBirth,
        description: data.description,
        email: data.email,
        experienceYears: data.experienceYears,
        interest: data.interest.split(';').filter((s) => s.trim() != ''),
        language: data.language,
        learningResource: data.learningResource
          .split(';')
          .filter((s) => s.trim() != ''),
        name: data.name,
        profilePictureLink: data.profilePicture,
        skill: data.skill.split(';').filter((s) => s.trim() != ''),
        tools: data.tools.split(';').filter((s) => s.trim() != ''),
        filledInformation: data.filledInformation,
        friends: [],
      },
      'User Informatoin',
      true,
    );
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
    if (userId == undefined)
      return Helper.createResponse(null, 'User Id cannot be null', false);
  }

  @Post('train-friend-recommendation')
  async apus(): Promise<IResponse<boolean>> {
    return this.userService.trainFriendRecommendation();
  }

  @Get('friend-recommendation/:id')
  async getFriendRecommendation(
    @Param() params: any,
  ): Promise<IResponse<UserDTO[]>> {
    const userId = params.id;
    console.log(userId);

    if (userId == undefined || userId == null)
      return Helper.createResponse(
        [],
        'There is no user id in the parameter',
        false,
      );
    else if (userId == '')
      return Helper.createResponse([], 'User id cannot be empty', false);

    return await this.userService.getUserRecommendation(userId);
  }

  @Patch()
  async updateUserInformation(
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<IResponse<boolean>> {
    const validationResult = this.validateUpdateUserDTO(updateUserDTO);
    if (validationResult != '')
      return Helper.createResponse(false, validationResult, false);

    return this.userService.updateUserData(updateUserDTO);
  }

  validateUpdateUserDTO(data: UpdateUserDTO): string {
    const errors: string[] = [];

    if (typeof data.id !== 'string' || data.id.trim() === '') {
      errors.push("Invalid or missing 'id'.");
    }

    if (typeof data.name !== 'string' || data.name.trim() === '') {
      errors.push("Invalid or missing 'name'.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof data.email !== 'string' || !emailRegex.test(data.email)) {
      errors.push("Invalid or missing 'email'.");
    }

    if (
      typeof data.profilePictureLink !== 'string' ||
      data.profilePictureLink.trim() === ''
    ) {
      errors.push("Invalid or missing 'profilePictureLink'.");
    }

    if (
      typeof data.description !== 'string' ||
      data.description.trim() === ''
    ) {
      errors.push("Invalid or missing 'description'.");
    }

    if (
      !(data.dateOfBirth instanceof Date) ||
      isNaN(data.dateOfBirth.getTime())
    ) {
      errors.push("Invalid or missing 'dateOfBirth'.");
    }

    if (typeof data.language !== 'string' || data.language.trim() === '') {
      errors.push("Invalid or missing 'language'.");
    }

    if (
      typeof data.currentEducation !== 'string' ||
      data.currentEducation.trim() === ''
    ) {
      errors.push("Invalid or missing 'currentEducation'.");
    }

    if (typeof data.experienceYears !== 'number' || data.experienceYears < 0) {
      errors.push("Invalid or missing 'experienceYears'.");
    }

    if (
      !Array.isArray(data.interest) ||
      !data.interest.every((item) => typeof item === 'string')
    ) {
      errors.push(
        "Invalid or missing 'interest' (must be an array of strings).",
      );
    }

    for (const skill of data.skill) {
      if (!interestType.includes(skill))
        errors.push('Skill is not the same as the types');
    }

    for (const interest of data.interest) {
      if (!interestType.includes(interest))
        errors.push('Interest is not the same as the types');
    }

    for (const learningResource of data.learningResource) {
      if (!learningResources.includes(learningResource))
        errors.push('Learning Resource is not the same as the types');
    }

    for (const tool of data.tools) {
      if (!toolTypes.includes(tool))
        errors.push('Tool Type is not the same as the types');
    }

    if (
      !Array.isArray(data.learningResource) ||
      !data.learningResource.every((item) => typeof item === 'string')
    ) {
      errors.push(
        "Invalid or missing 'learningResource' (must be an array of strings).",
      );
    }

    if (
      !Array.isArray(data.tools) ||
      !data.tools.every((item) => typeof item === 'string')
    ) {
      errors.push("Invalid or missing 'tools' (must be an array of strings).");
    }

    return errors.length > 0 ? errors[0] : '';
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

    return errors[0] ? errors[0] : '';
  }
}
