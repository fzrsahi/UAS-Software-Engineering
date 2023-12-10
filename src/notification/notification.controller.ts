import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from 'src/movie/dto';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notifService: NotificationService,
    private readonly eventService: EventEmitter2,
  ) {}

  @OnEvent('movie:created')
  createNotif(data: CreateMovieDto) {
    return this.notifService.create(data);
  }

  @Get()
  getAll() {
    return this.notifService.getAll();
  }
}
