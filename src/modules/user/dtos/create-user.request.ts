import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  role: string;
}
