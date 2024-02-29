import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

/**
 * Data transfer object (DTO) for representing product data.
 * This DTO defines the structure of product data for input/output operations.
 */
export class ProductItemDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(6, { message: 'this code is not valid length' })
  readonly productCode: string;

  @ApiProperty()
  @IsNumber({}, { message: 'Quantity must be a number' })
  @IsNotEmpty({ message: 'Quantity is required' })
  @IsPositive({ message: 'Quantity must be greater than zero' })
  readonly quantity: number;
}
