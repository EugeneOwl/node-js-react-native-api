import { Express, Router } from 'express';
import { userRouter } from './user-router';
import { httpErrorHandler } from "../middlewares/base-http-error-handler";
import { authRouter } from "./auth-router";
import { teamRouter } from "./team-router";
import { taskRouter } from "./task-router";

class BaseRouter {

  static BASE_ROUTE = '/api';

  setUpRoutes(app: Express): void {
    const router = Router();

    userRouter.setUpRoutes(BaseRouter.BASE_ROUTE, router);
    authRouter.setUpRoutes(BaseRouter.BASE_ROUTE, router);
    teamRouter.setUpRoutes(BaseRouter.BASE_ROUTE, router);
    taskRouter.setUpRoutes(BaseRouter.BASE_ROUTE, router);

    app.use(router);
    app.use(httpErrorHandler.handleError);
  }
}

const baseRouter = new BaseRouter();

export { baseRouter };
