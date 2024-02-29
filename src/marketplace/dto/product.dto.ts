import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

/**
 * Data transfer object (DTO) for representing product data.
 * This DTO defines the structure of product data for input/output operations.
 */
export class ProductDTO {
  @ApiProperty()
  @Expose({ name: 'code', groups: ['product', 'productDetail'] })
  @IsString()
  @IsNotEmpty()
  @MaxLength(6, { message: 'this code is not valid length' })
  readonly productCode: string;

  @ApiProperty()
  @Expose({ groups: ['product', 'productDetail'] })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'this name is not valid length' })
  readonly name: string;

  @ApiProperty()
  @Expose({ groups: ['product', 'productDetail'] })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @Expose({ groups: ['product', 'productDetail'] })
  @IsString()
  @IsNotEmpty()
  @Transform(({ obj }) => obj.category.code)
  readonly categoryCode: string;

  @ApiProperty()
  @Expose({ groups: ['productDetail'] })
  @IsNumber({ allowNaN: false }, { message: 'price must be a number' })
  @IsNotEmpty({ message: 'Price is required' })
  @MaxLength(10, { message: 'Price must not exceed 10 characters' })
  readonly price: number;

  @ApiProperty()
  @Expose({ groups: ['productDetail'] })
  @IsNumber({ allowNaN: false }, { message: 'price must be a number' })
  @IsNotEmpty({ message: 'Stock is required' })
  @MaxLength(10, { message: 'Stock must not exceed 10 characters' })
  readonly stock: number;

  @ApiProperty()
  @Expose({ groups: ['productDetail'] })
  @IsString({ message: 'Color must be a string' })
  @IsNotEmpty({ message: 'Color is required' })
  @MaxLength(50, { message: 'Color must not exceed 50 characters' })
  readonly color: string;

  @ApiProperty()
  @Expose({ groups: ['productDetail'] })
  @IsString({ message: 'Size must be a string' })
  @IsNotEmpty({ message: 'Size is required' })
  @MaxLength(50, { message: 'Size must not exceed 50 characters' })
  readonly size: string;

  readonly quantity: number;
  readonly totalPrice: number;

  constructor(
    productCode: string,
    quantity: number,
    price: number,
    totalPrice: number,
  ) {
    this.productCode = productCode;
    this.quantity = quantity;
    this.price = price;
    this.totalPrice = totalPrice;
  }
}
