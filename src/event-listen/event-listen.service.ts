import { Injectable } from '@nestjs/common';
import { EventListen } from './event-listen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers, VoidSigner } from 'ethers';
import { EventRepository } from './event-listen.repository';
import { abi } from '../abis/exchange';
import { retry } from 'rxjs';
import { time } from 'console';
import { UserPurchaseHistory } from './dto/user-purshase-history.dto';
import { UserSellHistory } from './dto/user-sell-history.dto';
// require('dotenv').config();

@Injectable()
export class EventListenService {
  constructor(
    @InjectRepository(EventListen)
    private eventRepository: EventRepository,
  ) {}

  async listenBuyEvents(): Promise<void> {
    const exchangeAddress = '';
    const provider = new ethers.providers.WebSocketProvider(
      `wss://goerli.infura.io/ws/v3/${'7c29a074ebf044f18251c824fb11472f'}`,
    );

    const contract = new ethers.Contract(exchangeAddress, abi, provider);

    contract.on('buy', async (_to, _tokenId, _amount) => {
      const event = new EventListen();
      event._to = _to;
      event._tokenId = _tokenId;
      event._amountBuy = _amount;
      event._sold = false;

      if (
        this.eventRepository.findOne({
          where: { _to: _to },
        })
      ) {
        const exist = await this.eventRepository.findOne({
          where: { _to: _to },
        });
        exist._tokenId.push(_tokenId);
        exist._amountBuy.push(_amount);
        exist._sold = false;
        await this.eventRepository.save(exist);
      }

      const Buy = await this.eventRepository.create(event);
      await this.eventRepository.save(Buy);
    });
  }

  async listenSellEvents(): Promise<void> {
    const exchangeAddress = '';
    const provider = new ethers.providers.WebSocketProvider(
      `wss://goerli.infura.io/ws/v3/${'7c29a074ebf044f18251c824fb11472f'}`,
    );

    const contract = new ethers.Contract(exchangeAddress, abi, provider);

    contract.on(
      'sell',
      async (sender, _tokenId, _amount, _adminAmount, event) => {
        const exist = await this.eventRepository.findOne({
          where: { _tokenId: _tokenId },
        });
        if (exist._to == sender) {
          exist._sold = true;
          exist._adminAmount = _adminAmount;
          exist._amountSell = _amount;
          await this.eventRepository.save(exist);
        } else {
          const event = new EventListen();
          event._to = sender;
          event._tokenId = _tokenId;
          event._amountSell = _amount;
          event._adminAmount = _adminAmount;
          event._sold = true;
          const exist = await this.eventRepository.create(event);
          await this.eventRepository.save(exist);
        }
      },
    );
  }

  async getPurchaseHistory(user: string): Promise<UserPurchaseHistory> {
    this.listenBuyEvents();
    const userHistory = await this.eventRepository.findOne({
      where: { _to: user },
    });

    const buyHistory = new UserPurchaseHistory();
    buyHistory.to = userHistory._to;
    buyHistory.tokenId = userHistory._tokenId;
    buyHistory.amountBuy = userHistory._amountBuy;

    return buyHistory;
  }

  async getSellHistory(user: string): Promise<UserSellHistory> {
    this.listenSellEvents();
    const userHistory = await this.eventRepository.findOne({
      where: { _to: user },
    });

    const sellHistory = new UserSellHistory();
    sellHistory.to = userHistory._to;
    sellHistory.tokenId = userHistory._tokenId;
    sellHistory.amountSell = userHistory._amountSell;
    sellHistory.adminAmount = userHistory._adminAmount;

    return sellHistory;
  }
}
