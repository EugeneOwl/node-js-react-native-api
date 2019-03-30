import { taskController } from '../controllers/task-controller';
import { AppRouter } from "./app-router";
import { Router } from "express";
import { projectIdMiddleware } from "../middlewares/request-query-middlewares/project-id-query-middleware";
import { idMiddleware } from "../middlewares/request-params-middlewares/id-param-middleware";
import { expiredOnlyMiddleware } from "../middlewares/request-query-middlewares/expired-only-query-middleware";
import { taskStatusIdMiddleware } from "../middlewares/request-query-middlewares/task-status-id-query-middleware";

class TaskRouter implements AppRouter {

  static TASKS_URL = '/tasks';
  static ADD_URL = TaskRouter.TASKS_URL + '/new';
  static DETAILS_URL = TaskRouter.TASKS_URL + '/details/:id';

  setUpRoutes(routePrefix: string, router: Router): void {
    router.get(
      routePrefix + TaskRouter.TASKS_URL,
      projectIdMiddleware.parseProjectId,
      taskStatusIdMiddleware.parseTaskStatusId,
      expiredOnlyMiddleware.parseExpiredOnly,
      taskController.getAll
    );
    router.post(routePrefix + TaskRouter.ADD_URL, taskController.add);
    router.get(routePrefix + TaskRouter.DETAILS_URL, idMiddleware.parseId, taskController.getDetails);
    router.get(routePrefix + TaskRouter.ADD_URL, projectIdMiddleware.parseProjectId, taskController.getPreCreateData);
  }
}

const taskRouter = new TaskRouter();

export { taskRouter };
