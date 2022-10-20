import { Controller, Get, Param } from '@nestjs/common';
import { UserPurchaseHistory } from './dto/user-purshase-history.dto';
import { EventListenService } from './event-listen.service';

@Controller('event-listen')
export class EventListenController {
  constructor(private eventListenService: EventListenService) {}

  @Get()
  userBuyHistory(@Param('User') User: string): Promise<UserPurchaseHistory> {
    return this.eventListenService.getPurchaseHistory(User);
  }
}
