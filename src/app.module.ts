import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HelpersModule } from './helpers/helpers.module';
import { ClassModule } from './class/class.module';
import { BranchModule } from './branch/branch.module';
import { StudentModule } from './student/student.module';
import { HelpersService } from './helpers/helpers.service';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    StudentModule,
    ClassModule,
    BranchModule,
    HelpersModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, HelpersService],
})
export class AppModule {}
