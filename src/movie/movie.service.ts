import { Injectable } from '@nestjs/common';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MovieService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async deleteOneById(id: string) {
    return await this.prisma.movies.delete({
      where: {
        id,
      },
    });
  }

  async create(dto: CreateMovieDto, userId: string) {
    const movies = await this.prisma.movies.create({
      data: {
        title: dto.title,
        description: dto.description,
        year: dto.year,
        posted_by: userId,
      },
    });

    this.eventEmitter.emitAsync('movie:created', movies);
    return movies;
  }

  async updateOneById(id: string, dto: UpdateMovieDto, userId: string) {
    console.log({ id, dto, userId });
    return await this.prisma.movies.update({
      where: {
        id,
      },
      data: {
        title: dto.title,
        description: dto.description,
        year: dto.year,
        updated_by: userId,
      },
    });
  }

  async findOneById(id: string) {
    return await this.prisma.movies.findUnique({
      where: {
        id,
      },
    });
  }

  async getAll() {
    return await this.prisma.movies.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }
}
