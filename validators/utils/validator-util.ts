import { BaseHttpError } from "../../src/errors/base-http-error";

class ValidatorUtil {

  validateId(id: any, errorMessage: string): void {
    if (!this.isValidId(id)) {
      throw new BaseHttpError(errorMessage, 400);
    }
  }

  validateRequiredString(string: any, errorMessage: string): void {
    if (!this.isNotBlankString(string)) {
      throw new BaseHttpError(errorMessage, 400);
    }
  }

  validateRequiredArrayOfIdentifiers(array: any, errorMessage: string): void {
    if (!Array.isArray(array) || !array.every(this.isValidId) || !this.isArrayWithNoRepetitions(array)) {
      throw new BaseHttpError(errorMessage, 400);
    }
  }

  private isValidId(id: any): boolean {
    return typeof id === 'number' && id > 0;
  }

  private isNotBlankString(string: any): boolean {
    return typeof string === 'string' && !!string.trim()
  }

  private isArrayWithNoRepetitions(array: any[]) {
    return Array.from(new Set(array)).length === array.length;
  }
}

const validatorUtil = new ValidatorUtil();

export { validatorUtil };
