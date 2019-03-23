import { Request, Response } from "express-serve-static-core";
import { validatorUtil } from "../../../validators/utils/validator-util";

class IdParamMiddleware {

  parseId(request: Request, response: Response, next: any): void {
    const id = parseInt(request.params.id, 10);
    validatorUtil.validateId(id, 'Id must be provided and must be positive number.');

    request.params.id = id;
    next();
  }
}

const idMiddleware = new IdParamMiddleware()

export { idMiddleware }
