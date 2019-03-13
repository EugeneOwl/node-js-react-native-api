import { BaseHttpError } from "./base-http-error";

export class BaseHttpErrorWrapper {
  error: BaseHttpError;

  constructor(error: BaseHttpError) {
    this.error = error;
  }
}
