import { PartialType, PickType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PickType(CreateProductDto, [
  'name',
  'price',
  'qty',
] as const) {
  image: string;
}
