import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: string, dto: UpdateUserDto) {
    return await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        username: dto.username,
      },
      select: {
        id: true,
        name: true,
        username: true,
      },
    });
  }

  async create(dto: CreateUserDto) {
    dto.password = await bcrypt.hash(dto.password, 10);
    const username = dto.username;
    const isUsernameExist = await this.prisma.users.findFirst({
      where: {
        username,
      },
      select: {
        username: true,
      },
    });
    if (isUsernameExist)
      throw new BadRequestException('Username Already Registered !');

    return this.prisma.users.create({
      data: {
        username,
        name: dto.name,
        password: dto.password,
      },
      select: {
        id: true,
        username: true,
        created_at: true,
      },
    });
  }

  async getAll() {
    return await this.prisma.users.findMany({
      orderBy: {
        created_at: 'desc',
      },
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findOneById(id: string) {
    return await this.prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
}
