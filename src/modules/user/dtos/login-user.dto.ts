import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;
  @IsNotEmpty()
  password: string;
}
