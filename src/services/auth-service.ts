import { userRepository } from "../repositories/user-repository";
import { passwordSerrvice } from "../security/password-service";
import { BaseHttpError } from "../errors/base-http-error";
import { LoginRequest, SessionData } from "../models/auth/login-model";

class AuthService {

  async validateCredentials(loginRequest: LoginRequest): Promise<void> {

    if (!loginRequest.username || !loginRequest.password) {
      throw new BaseHttpError('Not enough credentials.', 401);
    }

    const passwordHash = await userRepository.findPasswordByUsername(loginRequest.username);
    if (!passwordHash) {
      throw new BaseHttpError('Wrong username.', 401);
    }

    const passwordCorrect = await passwordSerrvice.comparePassword(loginRequest.password, passwordHash);
    if (!passwordCorrect) {
      throw new BaseHttpError('Wrong password.', 401);
    }
  }

  async getSessionData(username: string): Promise<SessionData> {
    return await userRepository.getSessionData(username);
  }
}

const authService = new AuthService();

export { authService }
