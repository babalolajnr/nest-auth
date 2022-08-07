import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterUserDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDTO, @Res() response: Response) {
    if (dto.password != dto.confirm_password) {
      return response.status(400).json({
        statusCode: 400,
        message: ['password and confirm_password do not match'],
        error: 'Bad Request',
      });
    }

    const user = await this._authService.register(dto);

    return response.status(201).json({
      statusCode: 201,
      message: 'User registered successfully',
      data: user,
    });
  }

  @Post('login')
  async login(@Body() dto: LoginDTO) {
    return await this._authService.validateUser(dto);
  }
}
