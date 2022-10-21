import { IsArray, IsBoolean, IsString } from 'class-validator';

export class UserSellHistory {
  @IsString()
  to: string;

  @IsArray()
  tokenId: number[];

  @IsArray()
  amountSell: number[];

  @IsBoolean()
  sold: boolean;

  @IsArray()
  adminAmount: number[];
}
