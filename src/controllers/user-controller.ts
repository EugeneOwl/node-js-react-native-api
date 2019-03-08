import { User } from '../models/user';
import { Request, Response } from 'express-serve-static-core';

export class UserController {

  getAll(request: Request, response: Response): Response {
    const users: User[] = [
      { id: 1, username: 'Eugene' },
      { id: 2, username: 'Viktoria' }
    ];
    return response.send(users);
  }
}

const userController = new UserController();

export { userController };