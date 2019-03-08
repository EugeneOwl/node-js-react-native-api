import { User } from '../models/user';
import { Request, Response } from 'express-serve-static-core';
import { databasePool } from '../db/data-base-pool';

export class UserController {

  async getAll(request: Request, response: Response): Promise<Response> {
    const { rows } = await databasePool.query('SELECT * FROM users');
    const users: User[] = rows as User[];
    return response.send(users);
  }
}

const userController = new UserController();

export { userController };