import { Module } from '@nestjs/common';
import { MarketplaceController } from './marketplace.controller';
import { ProductService } from './marketplace.service';
import { PrismaModule } from 'src/prisma/prisma.module';

/**
 * Module for the Marketplace feature.
 * This module imports the necessary controllers, providers, and modules for managing products in the marketplace.
 */
@Module({
  controllers: [MarketplaceController],
  providers: [ProductService],
  imports: [PrismaModule],
})
export class MarketplaceModule {}
