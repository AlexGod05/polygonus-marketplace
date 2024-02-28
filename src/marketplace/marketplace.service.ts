import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { Product, ShoppingCart } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDTO } from './dto/product.dto';
import { plainToClass } from 'class-transformer';
import { ShoppingCartDTO } from './dto/shoppingcart.dto';
import { GenericResponse } from 'src/shader/response/http.response';
import { GenericException } from 'src/shader/exception/http.exception';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves all products from the database.
   * Returns a list of products.
   * Throws an error if any occurs during the process.
   * @returns Promise<GenericResponse<ProductDTO[]>>
   */
  async allProducts(): Promise<GenericResponse<ProductDTO[]>> {
    try {
      const listProduct: Product[] = await this.prisma.product.findMany({
        include: {
          category: true,
        },
      });
      this.listProductEmpty(listProduct);
      const listProductDto = await listProduct.map((product: Product) =>
        plainToClass(ProductDTO, product, {
          excludeExtraneousValues: true,
          groups: ['product'],
        }),
      );
      return new GenericResponse(
        HttpStatus.OK,
        'List of products',
        listProductDto,
      );
    } catch (error) {
      if (error instanceof GenericException) {
        return new GenericException(error.status, error.message, error.data);
      }
      return new GenericException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error Internal Server',
        error,
      );
    }
  }

  /**
   * Searches for a product with the given product code.
   * Returns the found product.
   * Throws an error if the product code is missing or if the product is not found.
   * @param productCode The code of the product to search for.
   * @param typeProduct The type of product (e.g., 'product', 'productDetail').
   * @returns Promise<GenericResponse<ProductDTO>>
   */
  async searchProductWitchCode(
    productCode: string,
    typeProduct: string,
  ): Promise<GenericResponse<ProductDTO>> {
    try {
      this.validateProductCode(productCode);
      const product: Product = await this.prisma.product.findFirst({
        where: {
          code: productCode,
        },
        include: {
          category: true,
        },
      });
      this.productNotFound(product, productCode);
      const productDto = plainToClass(ProductDTO, product, {
        excludeExtraneousValues: true,
        groups: [typeProduct],
      });
      return new GenericResponse(
        HttpStatus.OK,
        'Product found success',
        productDto,
      );
    } catch (error) {
      if (error instanceof GenericException) {
        return new GenericException(error.status, error.message, error.data);
      }
      return new GenericException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error Internal Server',
        error,
      );
    }
  }

  /**
   * Searches for products by category code.
   * Returns a list of products belonging to the specified category.
   * Throws an error if the category code is missing or if no products are found for the category.
   * @param categoryCode The code of the category to search for.
   * @returns Promise<GenericResponse<ProductDTO[]>>
   */
  async searchProductsByCategoryCode(
    categoryCode: string,
  ): Promise<GenericResponse<ProductDTO[]>> {
    try {
      if (!categoryCode)
        throw new GenericException(
          HttpStatus.BAD_REQUEST,
          'categoryCode is required',
          null,
        );
      const listProduct: Product[] = await this.prisma.product.findMany({
        where: {
          category: {
            code: categoryCode,
          },
        },
        include: {
          category: true,
        },
      });
      this.listProductEmpty(listProduct);

      const listProductDto = await listProduct.map((product: Product) =>
        plainToClass(ProductDTO, product, {
          excludeExtraneousValues: true,
          groups: ['product'],
        }),
      );
      return new GenericResponse(
        HttpStatus.OK,
        'List of products by Category',
        listProductDto,
      );
    } catch (error) {
      if (error instanceof GenericException) {
        return new GenericException(error.status, error.message, error.data);
      }
      return new GenericException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error Internal Server',
        error,
      );
    }
  }

  /**
   * Retrieves the details of the shopping cart.
   * Returns a list of products in the shopping cart.
   * Throws an error if the shopping cart is empty.
   * @returns Promise<GenericResponse<ShoppingCartDTO[]>>
   */
  async detailShoppingCart(): Promise<GenericResponse<ShoppingCartDTO[]>> {
    try {
      const listShoppingCart: ShoppingCart[] =
        await this.prisma.shoppingCart.findMany({
          include: {
            product: true,
          },
        });
      this.shoppingCartEmpty(listShoppingCart);
      const listShoppingCartDto = await Promise.all(
        listShoppingCart.map(async (shoppingCart: ShoppingCart) => {
          const product = await this.prisma.product.findFirst({
            where: {
              product_id: shoppingCart.product_id,
            },
          });
          return new ShoppingCartDTO(product.code, shoppingCart.quantity);
        }),
      );
      return new GenericResponse(
        HttpStatus.OK,
        'Detail the shopping cart',
        listShoppingCartDto,
      );
    } catch (error) {
      if (error instanceof GenericException) {
        return new GenericException(error.status, error.message, error.data);
      }
      return new GenericException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error Internal Server',
        error,
      );
    }
  }

  /**
   * Adds a product to the shopping cart.
   * Throws an error if the product code is missing, the product is not found, or an error occurs during the process.
   * @param shoppingCartDto The DTO containing the product code and quantity to add.
   * @returns Promise<GenericResponse<any>>
   */
  async addProductShoppigCart(
    shoppingCartDto: ShoppingCartDTO,
  ): Promise<GenericResponse<ShoppingCartDTO[]>> {
    try {
      const productCode = shoppingCartDto.productCode;
      const product = await this.prisma.product.findFirst({
        where: {
          code: productCode,
        },
      });
      this.productNotFound(product, productCode);
      const newStock = this.stockProduct(
        product.stock,
        shoppingCartDto.quantity,
      );
      this.updateStockProduct(product, newStock);
      const existingCartItem = await this.prisma.shoppingCart.findFirst({
        where: {
          product_id: product.product_id,
        },
      });

      if (existingCartItem) {
        await this.prisma.shoppingCart.update({
          where: {
            cart_id: existingCartItem.cart_id,
          },
          data: {
            quantity: {
              increment: shoppingCartDto.quantity,
            },
          },
        });
      } else {
        await this.prisma.shoppingCart.create({
          data: {
            product_id: product.product_id,
            quantity: shoppingCartDto.quantity,
          },
        });
      }
      return new GenericResponse(
        HttpStatus.OK,
        'product added to shopping cart successfully',
        null,
      );
    } catch (error) {
      if (error instanceof GenericException) {
        return new GenericException(error.status, error.message, error.data);
      }
      console.log('error: ', error);
      return new GenericException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error Internal Server',
        error,
      );
    }
  }

  /**
   * Deletes a product from the shopping cart.
   * Throws an error if the product code is missing, the product is not found in the shopping cart, or an error occurs during the process.
   * @param productCode The code of the product to delete from the shopping cart.
   * @returns Promise<GenericResponse<any>>
   */
  async deleteProductShoppingCart(
    productCode: string,
  ): Promise<GenericResponse<ShoppingCartDTO[]>> {
    try {
      this.validateProductCode(productCode);
      const product = await this.prisma.product.findFirst({
        where: {
          code: productCode,
        },
      });
      this.productNotFound(product, productCode);
      const existingCartItem = await this.prisma.shoppingCart.findFirst({
        where: {
          product_id: product.product_id,
        },
      });
      if (!existingCartItem) {
        throw new GenericException(
          HttpStatus.BAD_REQUEST,
          'The product not exist in the shopping',
          null,
        );
      }
      await this.prisma.shoppingCart.delete({
        where: {
          cart_id: existingCartItem.cart_id,
        },
      });
      const newStock = product.stock + existingCartItem.quantity;
      this.updateStockProduct(product, newStock);
      return new GenericResponse(
        HttpStatus.OK,
        'product delete to shopping cart successfully',
        null,
      );
    } catch (error) {
      if (error instanceof GenericException) {
        return new GenericException(error.status, error.message, error.data);
      }
      console.log('error: ', error);
      return new GenericException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error Internal Server',
        error,
      );
    }
  }

  // Updates the stock of a product in the database.
  // Throws an error if any occurs during the update process.

  async updateStockProduct(product: Product, newStock: number) {
    await this.prisma.product.update({
      where: {
        product_id: product.product_id,
      },
      data: {
        stock: newStock,
      },
    });
  }

  // Calculates the new stock after a purchase.
  // Throws an error if there are not enough products in stock.
  stockProduct(stock: number, quantity: number) {
    const newStock = stock - quantity;
    if (newStock < 0)
      throw new GenericException(
        HttpStatus.BAD_REQUEST,
        'There are not enough products in stock',
        null,
      );
    return newStock;
  }

  // Throws an error if a product with the specified code is not found.
  productNotFound(product: Product, productCode: string) {
    if (!product)
      throw new GenericException(
        HttpStatus.NOT_FOUND,
        'Not found product with code: ' + productCode,
        null,
      );
  }

  // Throws an error if the list of products is empty.
  listProductEmpty(listProduct: Product[]) {
    if (listProduct.length === 0)
      throw new GenericException(
        HttpStatus.OK,
        'List the product is empty',
        [],
      );
  }

  // Throws an error if the shopping cart is empty.
  shoppingCartEmpty(shoppingCart: ShoppingCart[]) {
    if (shoppingCart.length === 0)
      throw new GenericException(
        HttpStatus.OK,
        'The Shopping cart is empty',
        [],
      );
  }

  // Validates if a product code is provided.
  // Throws an error if the product code is missing.
  validateProductCode(productCode: string) {
    if (!productCode)
      throw new GenericException(
        HttpStatus.BAD_REQUEST,
        'productCode is required',
        null,
      );
  }
}
