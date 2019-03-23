import { userController } from '../controllers/user-controller';
import { AppRouter } from "./app-router";
import { Router } from "express";
import { projectIdMiddleware } from "../middlewares/request-query-middlewares/project-id-query-middleware";
import { idMiddleware } from "../middlewares/request-params-middlewares/id-param-middleware";

class UserRouter implements AppRouter {

  static USERS_URL = '/users';
  static ADD_URL = UserRouter.USERS_URL + '/new';
  static DETAILS_URL = UserRouter.USERS_URL + '/details/:id';

  setUpRoutes(routePrefix: string, router: Router): void {
    router.get(routePrefix + UserRouter.USERS_URL, projectIdMiddleware.parseProjectId, userController.getAll);
    router.post(routePrefix + UserRouter.ADD_URL, userController.add);
    router.get(routePrefix + UserRouter.DETAILS_URL, idMiddleware.parseId, userController.getDetails);
    router.get(routePrefix + UserRouter.ADD_URL, projectIdMiddleware.parseProjectId, userController.getPreCreateData);
  }
}

const userRouter = new UserRouter();

export { userRouter };
