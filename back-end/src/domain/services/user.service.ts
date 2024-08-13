import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO } from 'src/application/dtos/create-user.dto';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDTO: CreateUserDTO) {
    const createResult = await this.userRepository.create({
      id: v4(),
      description: createUserDTO.description,
      email: createUserDTO.email,
      name: createUserDTO.name,
      password: createUserDTO.password,
      profilePicture: createUserDTO.profilePictureLink,
    });

    return createResult;
  }
}
