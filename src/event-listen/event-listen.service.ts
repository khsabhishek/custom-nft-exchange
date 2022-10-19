import { Injectable } from '@nestjs/common';
import { eventListen } from './event-listen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ethers } from 'ethers';
import abi from '../abis/exchange.json';
import { EventRepository } from './event-listen.repository';
// require('dotenv').config();

@Injectable()
export class EventListenService {
  constructor(
    @InjectRepository(eventListen)
    private eventRepository: EventRepository,
  ) {}

  async listenEvents(): Promise<void> {
    const exchangeAddress = '';
    const provider = new ethers.providers.WebSocketProvider(
      `wss://goerli.infura.io/ws/v3/${'7c29a074ebf044f18251c824fb11472f'}`,
    );

    const contract = new ethers.Contract(exchangeAddress, abi, provider);

    contract.on('buy', (_to, _tokenId, _amount) => {
      const buy = {
        to: _to,
        tokenId: _tokenId,
        amountBuy: _amount,
      };
      // console.log(JSON.stringify(buy));
      const Buy = this.eventRepository.create({ _to, _tokenId, _amount });
      this.eventRepository.save(Buy);
    });
  }
}
