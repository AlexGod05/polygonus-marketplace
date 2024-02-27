import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async allProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async searchProduct(code: string): Promise<Product> {
    return this.prisma.product.findFirst({
      where: {
        code,
      },
    });
  }

  async createProduct(data: Product): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }
}
