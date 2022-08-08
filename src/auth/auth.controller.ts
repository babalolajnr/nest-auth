import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto';
import { LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDTO, @Response() response: any) {
    if (dto.password != dto.confirm_password) {
      return response.status(400).json({
        statusCode: 400,
        message: ['password and confirm_password do not match'],
        error: 'Bad Request',
      });
    }

    const user = await this.authService.register(dto);

    return response.status(201).json({
      statusCode: 201,
      message: 'User registered successfully',
      data: user,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  // @Post('login')
  // async login(@Body() dto: LoginDTO) {
  //   return await this.authService.validateUser(dto);
  // }
}
