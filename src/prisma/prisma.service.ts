import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Service for managing Prisma database connection.
 * This service extends PrismaClient and ensures that the connection is established when the module initializes.
 */
@Injectable()
export class PrismaService extends PrismaClient {
  /**
   * Method called when the module initializes.
   * Establishes the connection to the database.
   */
  async onModuleInit() {
    await this.$connect();
  }
}
