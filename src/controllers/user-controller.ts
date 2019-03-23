import { Request, Response } from 'express-serve-static-core';
import { userService } from "../services/user-service";
import { RequestQueryKeys } from "../middlewares/request-query-middlewares/utils/request-query-keys";

class UserController {

  async getAll(request: Request, response: Response): Promise<void> {
    const users = await userService.getAll(request.query[RequestQueryKeys.PROJECT_ID]);
    response.send(users);
  }

  async add(request: Request, response: Response): Promise<void> {
    const user = userService.add(request.body);
    response.send(user);
  }
}

const userController = new UserController();

export { userController };
