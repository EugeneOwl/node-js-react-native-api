import { Request, Response } from "express-serve-static-core";
import { authService } from "../services/auth-service";
import { jwtTokenService } from "../security/jwt-token-service";
import { LoginResponse } from "../models/auth-model";

class AuthController {

  async login(request: Request, response: Response): Promise<void> {
    await authService.validateCredentials(request.body);

    const token = jwtTokenService.createToken();
    const loginResponse: LoginResponse = { token: token };

    response.send(loginResponse);
  }
}

const authController = new AuthController();

export { authController }
