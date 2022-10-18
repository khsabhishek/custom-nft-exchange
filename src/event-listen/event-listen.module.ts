import { Module } from '@nestjs/common';
import { EventListenController } from './event-listen.controller';
import { EventListenService } from './event-listen.service';

@Module({
  controllers: [EventListenController],
  providers: [EventListenService]
})
export class EventListenModule {}
