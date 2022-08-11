import { Injectable } from '@nestjs/common';
import { Class } from '@prisma/client';
import { HelpersService } from 'src/helpers/helpers.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassService {
  constructor(
    private prismaService: PrismaService,
    private helpersService: HelpersService,
  ) {}

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const slug = this.helpersService.slugify(createClassDto.name);

    const classroom = await this.prismaService.class.create({
      data: {
        ...createClassDto,
        slug,
      },
    });

    return classroom;
  }

  findAll() {
    return `This action returns all class`;
  }

  findOne(id: number) {
    return `This action returns a #${id} class`;
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
