import { HttpStatus } from '@nestjs/common';

/**
 * Class representing a generic exception.
 * This class may contain information about the status, message, and data related to the exception.
 */
export class GenericException<T> {
  /**
   * Constructor of the GenericException class.
   * @param status The status of the exception.
   * @param message The message associated with the exception.
   * @param data The data related to the exception.
   */
  constructor(
    public status: HttpStatus,
    public message: string,
    public data?: T,
  ) {}
}
