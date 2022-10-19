import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { eventListen } from './event-listen/event-listen.entity';
import { EventListenModule } from './event-listen/event-listen.module';

@Module({
  imports: [
    EventListenModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task.management',
      autoLoadEntities: true,
      synchronize: true,
      entities: [eventListen],
    }),
  ],
})
export class AppModule {}
