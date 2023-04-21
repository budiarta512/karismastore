import { IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  order: string;
  @IsNotEmpty()
  product: string;
  @IsNotEmpty()
  qty: number;
  @IsNotEmpty()
  price: number;
  additional_price: number;
  @IsNotEmpty()
  total: number;
}
