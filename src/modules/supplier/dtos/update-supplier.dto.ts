import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class UpdateSupplierDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;
  @IsNotEmpty()
  address: string;
}
