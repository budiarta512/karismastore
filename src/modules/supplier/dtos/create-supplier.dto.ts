import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;
  @IsNotEmpty()
  address: string;
}
