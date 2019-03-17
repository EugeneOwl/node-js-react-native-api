import { User } from "../models/user-model";
import { databasePool } from "../db/data-base-pool";

class UserRepository {

  async getAll(): Promise<User[]> {
    const { rows } = await databasePool.query('SELECT * FROM users');
    return rows as User[];
  }

  async findPasswordByUsername(username: string): Promise<string> {
    const { rows } = await databasePool.query('SELECT password FROM users WHERE username = $1', [username]);
    // @ts-ignore
    return rows.length ? rows[0].password as string : '';
  }
}

const userRepository = new UserRepository();

export { userRepository }
