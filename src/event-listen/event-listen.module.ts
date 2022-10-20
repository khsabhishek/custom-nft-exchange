import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { listenerCount } from 'process';
import { EventListenController } from './event-listen.controller';
import { EventListen } from './event-listen.entity';
import { EventListenService } from './event-listen.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventListen])],
  controllers: [EventListenController],
  providers: [EventListenService]
})
export class EventListenModule {}
