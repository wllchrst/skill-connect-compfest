import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO } from 'src/application/dtos/create-user.dto';
import { v4 } from 'uuid';
import { IResponse } from 'src/application/interfaces/response-interface';
import { User } from '@prisma/client';
import { Helper } from 'src/common/helper';
import { UpdateUserDTO } from 'src/application/dtos/update-user-dto';
import { AuthService } from './auth.service';
import { ModelRepository } from '../repositories/model.repository';
import { UserDTO } from 'src/application/dtos/user-dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly modelRepository: ModelRepository,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<IResponse<boolean>> {
    const userSameEmail = await this.userRepository.getUserByEmail(
      createUserDTO.email,
    );

    console.log(userSameEmail);

    if (userSameEmail != null)
      return Helper.createResponse(false, 'Email is already used', false);

    const createResult = await this.userRepository.create({
      currentEducation: '',
      description: '',
      experienceYears: -1,
      interest: '',
      language: '',
      learningResource: '',
      profilePicture: '',
      skill: '',
      tools: '',
      id: v4(),
      email: createUserDTO.email,
      name: createUserDTO.name,
      password: createUserDTO.password,
    });

    const message = !createResult
      ? 'Something went wrong when registering new user'
      : 'Success creating User';

    return Helper.createResponse(createResult, message, createResult);
  }

  async getUserById(id: string): Promise<IResponse<User>> {
    const user = await this.userRepository.getUserById(id);
    const message = user == null ? 'User not found' : 'User Found';
    const success = user != null;
    return Helper.createResponse(user, message, success);
  }

  async getAllUser() {
    const users = await this.userRepository.getAllUser();

    return Helper.createResponse(users, '', true);
  }

  async getUserByEmail(email: string): Promise<IResponse<User>> {
    const user = await this.userRepository.getUserByEmail(email);
    const message = user == null ? 'User not found' : 'User Found';
    const success = user == null ? false : true;
    return Helper.createResponse(user, message, success);
  }

  async getUserRecommendation(userId: string): Promise<IResponse<UserDTO[]>> {
    const users = await this.userRepository.getUserRecommendation(userId);
    const processUser: UserDTO[] = [];

    for (const data of users) {
      processUser.push({
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
      });
    }

    return Helper.createResponse(processUser, 'Recommended friends', true);
  }

  async trainFriendRecommendation(): Promise<IResponse<boolean>> {
    try {
      await this.modelRepository.trainFriendRecommendationModel();
      return Helper.createResponse(true, 'Training successful', true);
    } catch (error) {
      console.error(error);
      return Helper.createResponse(
        false,
        'Something went wrong look at backend',
        false,
      );
    }
  }

  async updateUserData(
    updateUserDTO: UpdateUserDTO,
  ): Promise<IResponse<boolean>> {
    const userExists = await this.userRepository.userExists(updateUserDTO.id);
    if (!userExists)
      return Helper.createResponse(false, 'User was not found', false);

    const updateResult = await this.userRepository.updateUserData(
      {
        id: updateUserDTO.id,
        email: updateUserDTO.email,
        name: updateUserDTO.name,
        skill: updateUserDTO.skill.join(';'),
        tools: updateUserDTO.tools.join(';'),
        language: updateUserDTO.language,
        interest: updateUserDTO.interest.join(';'),
        description: updateUserDTO.description,
        experienceYears: updateUserDTO.experienceYears,
        learningResource: updateUserDTO.learningResource.join(';'),
        profilePicture: updateUserDTO.profilePictureLink,
        currentEducation: updateUserDTO.currentEducation,
        dateOfBirth: updateUserDTO.dateOfBirth,
        filledInformation: updateUserDTO.filledInformation,
      },
      updateUserDTO.id,
    );

    const message = updateResult
      ? 'Updating user success'
      : 'Something went wrong while updating user';

    await this.trainFriendRecommendation();

    return Helper.createResponse(updateResult, message, updateResult);
  }
}
