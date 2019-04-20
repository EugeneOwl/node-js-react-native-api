import { Request, Response } from "express-serve-static-core";
import { RequestQueryKeys } from "./utils/request-query-keys";
import { validatorUtil } from "../../../validators/utils/validator-util";

class UserIdQueryMiddleware {

  parseUserId(request: Request, response: Response, next: () => void): void {
    if (!request.query[RequestQueryKeys.USER_ID]) {
      next();
      return;
    }
    const userId = parseInt(request.query[RequestQueryKeys.USER_ID], 10);
    validatorUtil.validateId(userId, 'User id must be positive number.');

    request.query[RequestQueryKeys.USER_ID] = userId;
    next();
  }
}

const userIdMiddleware = new UserIdQueryMiddleware();

export { userIdMiddleware }
