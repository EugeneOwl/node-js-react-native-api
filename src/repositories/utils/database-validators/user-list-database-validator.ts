import { databasePool } from "../../../db/data-base-pool";
import { BaseHttpError } from "../../../errors/base-http-error";

class UserListDatabaseValidator {

  async validateUniqueUsername(username: string, projectId: number): Promise<void> {
    const { rows } = await databasePool.query(this.COUNT_BY_USERNAME, [username, projectId]);

    // @ts-ignore
    if (parseInt(rows[0].count, 10)!== 0) {
      throw new BaseHttpError('User with such username already exists on needed project.', 400);
    }
  }

  private COUNT_BY_USERNAME = `
SELECT COUNT(id) FROM users WHERE username = $1 AND project_id = $2
  `;
}

const userDatabaseValidator = new UserListDatabaseValidator();

export { userDatabaseValidator }
