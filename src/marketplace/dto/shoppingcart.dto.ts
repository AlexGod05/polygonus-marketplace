import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

/**
 * Data Transfer Object (DTO) for representing shopping cart items.
 * This DTO is used for adding items to the shopping cart.
 */
export class ShoppingCartDTO {
  @ApiProperty()
  @Expose()
  @IsString({ message: 'ProductCode must be a string' })
  @IsNotEmpty({ message: 'ProductCode is required' })
  @MaxLength(6, { message: 'ProductCode must not exceed 6 characters' })
  readonly productCode: string;

  @ApiProperty()
  @Expose()
  @IsNumber({ allowNaN: false }, { message: 'Quantity must be a number' })
  @IsNotEmpty({ message: 'Quantity is required' })
  @Min(1, { message: 'Quantity must be at least 1' })
  readonly quantity: number;

  constructor(productCode: string, quantity: number) {
    this.productCode = productCode;
    this.quantity = quantity;
  }
}
