import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO, RegisterUserDTO } from './dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private _prismaService: PrismaService) {}

  async register(
    dto: RegisterUserDTO,
  ): Promise<{ name: string; email: string }> {
    const hash = await argon2.hash(dto.password);
    const { name, email } = dto;

    try {
      const user = await this._prismaService.user.create({
        data: { name, email, password: hash },
        select: {
          name: true,
          email: true,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }

      throw error;
    }
  }

  async login(dto: LoginDTO) {
    const { email, password } = dto;

    const user = await this._prismaService.user.findUnique({
      where: { email },
    });

    if (!user) throw new BadRequestException('Email/Password is Invalid');

    const match = await argon2.verify(user.password, password);

    if (!match) throw new BadRequestException('Email/Password is Invalid');

    return 'logged in';
  }
}
