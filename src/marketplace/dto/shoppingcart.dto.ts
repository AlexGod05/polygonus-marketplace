import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ProductDTO } from './product.dto';

/**
 * Data Transfer Object (DTO) for representing the complete shopping cart detail.
 */
export class ShoppingCartDTO {
  @ApiProperty({ type: [ProductDTO] })
  @Expose()
  readonly listProduct: ProductDTO[];

  @ApiProperty()
  @Expose()
  @IsNumber({}, { message: 'CantidadProducts must be a number' })
  @IsNotEmpty({ message: 'CantidadProducts is required' })
  readonly cantidadProducts: number;

  @ApiProperty()
  @Expose()
  @IsNumber({}, { message: 'Total must be a number' })
  @IsNotEmpty({ message: 'Total is required' })
  readonly total: number;

  constructor(
    listProduct: ProductDTO[],
    cantidadProducts: number,
    total: number,
  ) {
    this.listProduct = listProduct;
    this.cantidadProducts = cantidadProducts;
    this.total = total;
  }
}
