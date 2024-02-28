import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './marketplace.service';
import { ProductDTO } from './dto/product.dto';
import { ShoppingCartDTO } from './dto/shoppingcart.dto';
import { GenericResponse } from 'src/shader/response/http.response';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller for handling marketplace-related endpoints.
 * This controller defines endpoints for managing products and shopping cart operations.
 */
@ApiTags('Marketplace')
@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Retrieves all products.
   * Endpoint: GET /marketplace/all-products
   * - Returns a list of products.
   * - If no products are found, returns an empty list.
   * - If an error occurs during the process, returns an Internal Server Error.
   * @returns Promise<GenericResponse<ProductDTO[]>>
   */
  @Get('all-products')
  @ApiBody({ type: ProductDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of products | List of products empty',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error Internal Server',
  })
  async allProducts(): Promise<GenericResponse<ProductDTO[]>> {
    return await this.productService.allProducts();
  }

  /**
   * Searches for a product with the provided product code.
   * Endpoint: GET /marketplace/search-product-with-code
   * - Requires the 'productCode' query parameter.
   * - If the product is found, returns a success response with the product details.
   * - If 'productCode' is not provided, returns a Bad Request error.
   * - If no product is found with the provided code, returns a Not Found error.
   * - If an error occurs during the process, returns an Internal Server Error.
   * @param productCode The product code to search for.
   * @returns Promise<GenericResponse<ProductDTO>>
   */
  @Get('search-product-with-code')
  @ApiQuery({ name: 'productCode', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Product found success' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'productCode is required',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found product with code',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error Internal Server',
  })
  async searchProductWithCode(
    @Query('productCode') productCode: string,
  ): Promise<GenericResponse<ProductDTO>> {
    return await this.productService.searchProductWitchCode(
      productCode,
      'product',
    );
  }

  /**
   * Searches for a product with the provided product code and retrieves detailed information.
   * Endpoint: GET /marketplace/search-product-detail-with-code
   * - Requires the 'productCode' query parameter.
   * - If the product is found, returns a success response with detailed product information.
   * - If 'productCode' is not provided, returns a Bad Request error.
   * - If no product is found with the provided code, returns a Not Found error.
   * - If an error occurs during the process, returns an Internal Server Error.
   * @param productCode The product code to search for.
   * @returns Promise<GenericResponse<ProductDTO>>
   */
  @Get('search-product-detail-with-code')
  @ApiQuery({ name: 'productCode', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Product found success' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'productCode is required',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found product with code',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error Internal Server',
  })
  async searchProductDetailWithCode(
    @Query('productCode') productCode: string,
  ): Promise<GenericResponse<ProductDTO>> {
    return await this.productService.searchProductWitchCode(
      productCode,
      'productDetail',
    );
  }

  /**
   * Searches for products by the provided category code.
   * Endpoint: GET /marketplace/search-products-by-category-code
   * - Requires the 'categoryCode' query parameter.
   * - If products are found for the provided category code, returns a success response with a list of products.
   * - If 'categoryCode' is not provided, returns a Bad Request error.
   * - If no products are found for the provided category code, returns a success response with an empty list.
   * - If an error occurs during the process, returns an Internal Server Error.
   * @param categoryCode The category code to search for products.
   * @returns Promise<GenericResponse<ProductDTO[]>>
   */
  @Get('search-products-by-category-code')
  @ApiQuery({ name: 'categoryCode', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of products by Category | List the product is empty',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'categoryCode is required',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error Internal Server',
  })
  async searchProductByCategory(
    @Query('categoryCode') categoryCode: string,
  ): Promise<GenericResponse<ProductDTO[]>> {
    return await this.productService.searchProductsByCategoryCode(categoryCode);
  }

  @Get('detail-shopping-cart')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Detail the shopping cart | The Shopping cart is empty',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error Internal Server',
  })
  async allShoppingCart(): Promise<GenericResponse<ShoppingCartDTO[]>> {
    return await this.productService.detailShoppingCart();
  }

  /**
   * Adds a product to the shopping cart.
   * Endpoint: POST /marketplace/add-product-shopping-cart
   * - Expects a ShoppingCartDTO object in the request body.
   * - If the product is successfully added to the shopping cart, returns a success response.
   * - If the 'productCode' is missing in the request body, returns a Bad Request error.
   * - If the product with the provided 'productCode' is not found, returns a Not Found error.
   * - If an error occurs during the process, returns an Internal Server Error.
   * @param shoppingCartDto The ShoppingCartDTO object containing product details.
   * @returns Promise<GenericResponse<any>>
   */
  @Post('add-product-shopping-cart')
  @ApiBody({ type: ShoppingCartDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'product added to shopping cart successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'productCode is required',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found product with code',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error Internal Server',
  })
  async addProductShoppingCart(
    @Body() shoppingCartDto: ShoppingCartDTO,
  ): Promise<GenericResponse<any>> {
    return await this.productService.addProductShoppigCart(shoppingCartDto);
  }

  /**
   * Deletes a product from the shopping cart.
   * Endpoint: DELETE /marketplace/delete-product-shopping-cart
   * - Expects a 'productCode' query parameter.
   * - If the product is successfully deleted from the shopping cart, returns a success response.
   * - If the 'productCode' query parameter is missing, returns a Bad Request error.
   * - If the product with the provided 'productCode' is not found in the shopping cart, returns a Not Found error.
   * - If an error occurs during the process, returns an Internal Server Error.
   * @param productCode The code of the product to be deleted from the shopping cart.
   * @returns Promise<GenericResponse<any>>
   */
  @Delete('delete-product-shopping-cart')
  @ApiQuery({ name: 'productCode', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product deleted from the shopping cart successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ProductCode is required',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found product with code in the shopping cart',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error Internal Server',
  })
  @Delete('delete-product-shopping-cart')
  async deleteProductShoppingCart(
    @Query('productCode') productCode: string,
  ): Promise<GenericResponse<any>> {
    return await this.productService.deleteProductShoppingCart(productCode);
  }
}
