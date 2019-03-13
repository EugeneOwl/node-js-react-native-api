import { Request, Response } from "express-serve-static-core";
import { authService } from "../services/auth-service";

class AuthController {

  async login(request: Request, response: Response): Promise<Response> {
    await authService.validateCredentials(request.body);


  }
}
