import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@ApiBearerAuth('JWTAUTH')
@Controller('movies')
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getAll() {
    return this.movieService.getAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.movieService.findOneById(id);
  }

  @Post()
  create(@Body() dto: CreateMovieDto, @GetUser('id') userId: string) {
    return this.movieService.create(dto, userId);
  }

  @Patch(':id')
  updateOneById(
    @Param('id') id: string,
    @Body() dto: UpdateMovieDto,
    @GetUser('id') userId: string,
  ) {
    return this.movieService.updateOneById(id, dto, userId);
  }

  @Delete(':id')
  deleteOneById(@Param('id') id: string) {
    return this.movieService.deleteOneById(id);
  }
}
