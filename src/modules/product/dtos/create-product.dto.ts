import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  supplier: string;
  @IsNotEmpty()
  price: number;
  // @IsFile()
  // @IsNotEmpty()
  // @MaxFileSize(1000)
  // @HasMimeType(['image/jpeg', 'image/jpg', 'image/png'])
  image: string;
  @IsNotEmpty()
  qty: number;
}
