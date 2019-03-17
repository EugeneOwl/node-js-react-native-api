import { Request, Response } from 'express-serve-static-core';
import { userService } from "../services/user-service";

class UserController {

  async getAll(request: Request, response: Response): Promise<void> {
    const users = await userService.getAll();
    response.send(users);
  }

  async add(request: Request, response: Response): Promise<void> {
    const user = userService.add(request.body.user);
    response.send(user);
  }
}

const userController = new UserController();

export { userController };
