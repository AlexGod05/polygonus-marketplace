import { Module } from '@nestjs/common';
import { MarketplaceModule } from './marketplace/marketplace.module';

@Module({
  imports: [MarketplaceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
