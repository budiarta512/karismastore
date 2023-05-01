import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  invoice_no: string;
  @IsNotEmpty()
  carts: [
    {
      _id: string;
      product: string;
      price: number;
      total: number;
      qty: number;
      additional_price: number | null;
    },
  ];
  @IsNotEmpty()
  grand_total: number;
  @IsNotEmpty()
  customer: string;
  status: 'MENUNGGU' | 'SUKSES' | 'TIDAK VALID';
}
