import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class eventListen {
  @PrimaryGeneratedColumn()
  to: string;

  @Column()
  tokenId: string;

  @Column()
  amountBuy: string;
}
