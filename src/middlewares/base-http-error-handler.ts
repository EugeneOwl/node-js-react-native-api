import { Request, Response } from "express-serve-static-core";
import { BaseHttpError } from "../errors/base-http-error";
import { BaseHttpErrorWrapper } from "../errors/base-http-error-wrapper";

export class BaseHttpErrorHandler {

  handleError(error: Error | BaseHttpError, request: Request, response: Response, next: any): void {
    const httpErrorObject = error instanceof BaseHttpError ?
      error : new BaseHttpError(error.message, 500);

    console.error(httpErrorObject.toString());

    response.status(httpErrorObject.status);
    response.send(new BaseHttpErrorWrapper(httpErrorObject));
  }
}

const httpErrorHandler = new BaseHttpErrorHandler();

export { httpErrorHandler }
