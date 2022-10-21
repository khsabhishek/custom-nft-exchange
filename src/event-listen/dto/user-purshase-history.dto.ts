import { IsArray, IsBoolean, IsString } from 'class-validator';

export class UserPurchaseHistory {
  @IsString()
  to: string;

  @IsArray()
  tokenId: number[];

  @IsArray()
  amountBuy: number[];

  @IsBoolean()
  sold: boolean;
}