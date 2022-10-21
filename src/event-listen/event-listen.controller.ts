import { Controller, Get, Param } from '@nestjs/common';
import { UserPurchaseHistory } from './dto/user-purshase-history.dto';
import { UserSellHistory } from './dto/user-sell-history.dto';
import { EventListenService } from './event-listen.service';

@Controller('event-listen')
export class EventListenController {
  constructor(private eventListenService: EventListenService) {}

  @Get()
  userBuyHistory(@Param('User') User: string): Promise<UserPurchaseHistory> {
    return this.eventListenService.getPurchaseHistory(User);
  }

  @Get()
  userSellHistory(@Param('User') User: string): Promise<UserSellHistory> {
    return this.eventListenService.getSellHistory(User);
  }
}
