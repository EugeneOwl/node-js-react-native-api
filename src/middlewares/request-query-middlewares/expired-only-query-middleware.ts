import { Request, Response } from "express-serve-static-core";
import { RequestQueryKeys } from "./utils/request-query-keys";

class ExpiredOnlyQueryMiddleware {

  parseExpiredOnly(request: Request, response: Response, next: () => void): void {
    request.query[RequestQueryKeys.EXPIRED_ONLY] = Boolean(request.query[RequestQueryKeys.EXPIRED_ONLY]);
    next();
  }
}

const expiredOnlyMiddleware = new ExpiredOnlyQueryMiddleware();

export { expiredOnlyMiddleware }
