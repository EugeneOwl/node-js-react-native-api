import { userController } from '../controllers/user-controller';
import { AppRouter } from "./app-router";
import { Router } from "express";
import { projectIdMiddleware } from "../middlewares/request-query-middlewares/project-id-middleware";

class UserRouter implements AppRouter {

  static USERS_URL = '/users';

  setUpRoutes(routePrefix: string, router: Router): void {
    router.get(routePrefix + UserRouter.USERS_URL, projectIdMiddleware.parseProjectId, userController.getAll);
  }
}

const userRouter = new UserRouter();

export { userRouter };
