import { Request, Response } from "express-serve-static-core";
import { RequestQueryKeys } from "./utils/request-query-keys";
import { validatorUtil } from "../../../validators/utils/validator-util";

class ProjectIdQueryMiddleware {

  parseProjectId(request: Request, response: Response, next: () => void): void {
    const projectId = parseInt(request.query[RequestQueryKeys.PROJECT_ID], 10);
    validatorUtil.validateId(projectId, 'Project id must be provided and must be positive number.');

    request.query[RequestQueryKeys.PROJECT_ID] = projectId;
    next();
  }
}

const projectIdMiddleware = new ProjectIdQueryMiddleware();

export { projectIdMiddleware }
