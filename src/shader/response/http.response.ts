import { HttpStatus } from '@nestjs/common';

/**
 * Class representing a generic response.
 * This class may contain information about the status, message, and data related to the response.
 */
export class GenericResponse<T> {
  /**
   * Constructor of the GenericResponse class.
   * @param status The status of the response.
   * @param message The message associated with the response.
   * @param data The data related to the response.
   */
  constructor(
    public status: HttpStatus,
    public message: string,
    public data?: T,
  ) {}
}
