import { Router } from 'express';
import { userController } from '../controllers/user-controller';
import { Request, Response } from "express-serve-static-core";
import { authController } from "../controllers/auth-controller";

class AuthRouter {

  static AUTH_URL = '/auth';
  static LOGIN_URL = AuthRouter.AUTH_URL + '/login';

  setUpRoutes(routePrefix: string, router: Router): void {
    router.post(routePrefix + AuthRouter.LOGIN_URL, authController.login);
  }
}

const authRouter = new AuthRouter();

export { authRouter };
