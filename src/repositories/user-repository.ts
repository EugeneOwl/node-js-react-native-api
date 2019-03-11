import { User } from "../models/user";
import { databasePool } from "../db/data-base-pool";

export class UserRepository {

  async getAll(): Promise<User[]> {
    const { rows } = await databasePool.query('SELECT * FROM users');
    return rows as User[];
  }
}

const userRepository = new UserRepository();

export { userRepository }
