import { Request, Response } from 'express-serve-static-core';
import { userService } from "../services/user-service";

export class UserController {

  async getAll(request: Request, response: Response): Promise<Response> {
    const users = await userService.getAll();
    return response.send(users);
  }

  async add(request: Request, response: Response): Promise<Response> {
    const user = userService.add(request.body.user);
    return response.send(user);
  }
}

const userController = new UserController();

export { userController };
