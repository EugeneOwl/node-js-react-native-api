import { Router } from 'express';
import { userController } from '../controllers/user-controller';
import { Request, Response } from "express-serve-static-core";

class UserRouter {

  static USERS_URL = '/users';

  setUpRoutes(routePrefix: string, router: Router): void {
    router.get(routePrefix + UserRouter.USERS_URL, userController.getAll);
  }
}

const userRouter = new UserRouter();

export { userRouter };
