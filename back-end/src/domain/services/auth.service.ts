import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDTO } from 'src/application/dtos/login-user-dto';
import { IResponse } from 'src/application/interfaces/response-interface';
import { Helper } from 'src/common/helper';
import { JwtService } from '@nestjs/jwt';
import { IUserPayload } from 'src/application/interfaces/user-payload-interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(loginUserDTO: LoginUserDTO): Promise<IResponse<string>> {
    const { data } = await this.userService.getUserByEmail(loginUserDTO.email);

    if (data == null)
      return Helper.createResponse('', 'Wrong email or password', false);
    else if (data.password != loginUserDTO.password)
      return Helper.createResponse('', 'Wrong email or password', false);

    const payload: IUserPayload = { id: data.id, email: data.email };
    const token = await this.jwtService.signAsync(payload);

    return Helper.createResponse(token, 'Login successful', true);
  }
}
