import { Repository } from 'typeorm';
import { eventListen } from '../event-listen/event-listen.entity';
import { CustomRepository } from '../database/typeorm-ex.decorator';

@CustomRepository(eventListen)
export class EventRepository extends Repository<eventListen> {

}

