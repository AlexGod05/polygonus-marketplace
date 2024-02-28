import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Module for managing Prisma database connection.
 * This module provides the `PrismaService` and exports it for use in other modules.
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
