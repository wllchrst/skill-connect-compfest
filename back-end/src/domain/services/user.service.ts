import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO } from 'src/application/dtos/create-user.dto';
import { v4 } from 'uuid';
import { IResponse } from 'src/application/interfaces/response-interface';
import { User } from '@prisma/client';
import { Helper } from 'src/common/helper';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<IResponse<boolean>> {
    const userSameEmail = await this.userRepository.getUserByEmail(
      createUserDTO.email,
    );

    console.log(userSameEmail);

    if (userSameEmail != null)
      return Helper.createResponse(false, 'Email is already used', false);

    const createResult = await this.userRepository.create({
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
    const success = user == null ? false : true;
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
}
