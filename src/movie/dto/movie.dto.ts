import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ required: true })
  title: string;
  @ApiProperty({ required: true })
  year: string;
  @ApiProperty({ required: true })
  description: string;

  created_by?: string;
  id?: string;

}

export class UpdateMovieDto {
  @ApiProperty({ required: false })
  title: string;
  @ApiProperty({ required: false })
  year: string;
  @ApiProperty({ required: false })
  description: string;
}
