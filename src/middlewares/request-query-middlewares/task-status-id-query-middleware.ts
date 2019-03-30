import { Request, Response } from "express-serve-static-core";
import { RequestQueryKeys } from "./utils/request-query-keys";
import { validatorUtil } from "../../../validators/utils/validator-util";

class TaskStatusIdQueryMiddleware {

  parseTaskStatusId(request: Request, response: Response, next: () => void): void {
    if (!request.query[RequestQueryKeys.TASK_STATUS_ID]) {
      next();
      return;
    }
    const taskStatusId = parseInt(request.query[RequestQueryKeys.TASK_STATUS_ID], 10);
    validatorUtil.validateId(taskStatusId, 'Task status id must be positive number.');

    request.query[RequestQueryKeys.TASK_STATUS_ID] = taskStatusId;
    next();
  }
}

const taskStatusIdMiddleware = new TaskStatusIdQueryMiddleware();

export { taskStatusIdMiddleware }
