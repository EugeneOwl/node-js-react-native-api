import { Express, Router } from 'express';
import { userRouter } from './user-router';
import { httpErrorHandler } from "../middlewares/base-http-error-handler";

export class BaseRouter {

  static BASE_ROUTE = '/api';

  setUpRoutes(app: Express): void {
    const router = Router();
    userRouter.setUpRoutes(BaseRouter.BASE_ROUTE, router);

    app.use(router);
    app.use(httpErrorHandler.handleError);
  }
}

const baseRouter = new BaseRouter();

export { baseRouter };
