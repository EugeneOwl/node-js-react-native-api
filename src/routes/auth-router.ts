import { Router } from 'express';
import { authController } from "../controllers/auth-controller";
import { AppRouter } from "./app-router";

class AuthRouter implements AppRouter {

  static AUTH_URL = '/auth';
  static LOGIN_URL = AuthRouter.AUTH_URL + '/login';

  setUpRoutes(routePrefix: string, router: Router): void {
    router.post(routePrefix + AuthRouter.LOGIN_URL, authController.login);
  }
}

const authRouter = new AuthRouter();

export { authRouter };
