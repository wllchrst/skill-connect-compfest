import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/domain/services/auth.service';
import { LoginUserDTO } from '../dtos/login-user-dto';
import { Helper } from 'src/common/helper';
import { IResponse } from '../interfaces/response-interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async loginUser(
    @Body() loginUserDTO: LoginUserDTO,
  ): Promise<IResponse<string>> {
    const validationMessage = this.validateLoginUser(loginUserDTO);
    if (validationMessage != '')
      return Helper.createResponse('', validationMessage, false);

    return this.authService.loginUser(loginUserDTO);
  }

  validateLoginUser(loginUserDTO: LoginUserDTO): string {
    if (loginUserDTO.email == '' || loginUserDTO.password == '')
      return 'Email and password cannot be empty';

    return '';
  }
}
