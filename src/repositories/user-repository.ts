import { databasePool } from "../db/data-base-pool";
import { User, UserCandidate } from "../models/user/user-model";

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

  async getAllCandidates(): Promise<UserCandidate[]> {
    const { rows } = await databasePool.query('SELECT id, username, avatar FROM users ORDER BY username');
    return rows as unknown as UserCandidate[];
  }
}

const userRepository = new UserRepository();

export { userRepository }
