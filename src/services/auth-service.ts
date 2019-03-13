import { Request, Response } from "express-serve-static-core";
import { LoginRequest } from "../models/auth-model";

class AuthService {

  async validateCredentials(loginRequest: LoginRequest): void {
    // TODO find user by username and if not found throw 401 'no user with username found'

    // TODO validate password of user and if wrong throw 401 'password wrong'
  }
}

const authService = new AuthService();

export { authService }
