import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [AuthService, PrismaService, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
