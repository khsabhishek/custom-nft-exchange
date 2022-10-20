import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class EventListen {
  @PrimaryColumn()
  _to: string;

  @Column('int', { array: true })
  _tokenId: any[];

  @Column('int', { array: true })
  _amountBuy: any[];

  @Column()
  _sold: boolean;

  @Column('int', { array: true })
  _amountSell: number[];

  @Column('int', { array: true })
  _adminAmount: number[];
}
