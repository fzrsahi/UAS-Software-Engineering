import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [NotificationService],
  controllers: [NotificationController],
  imports: [PrismaModule],
})
export class NotificationModule {}
