import { Repository } from 'typeorm';
import { EventListen } from '../event-listen/event-listen.entity';
import { CustomRepository } from '../database/typeorm-ex.decorator';

@CustomRepository(EventListen)
export class EventRepository extends Repository<EventListen> {}

