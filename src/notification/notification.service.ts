import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from 'src/movie/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.notifications.findMany({
      include: {
        movie: true,
      },
    });
  }

  async create(data: CreateMovieDto) {
    await this.prisma.notifications.create({
      data: {
        movie_id: data.id,
        message: `New Movie : ${data.title} Just Posted !`,
      },
    });
  }
}
