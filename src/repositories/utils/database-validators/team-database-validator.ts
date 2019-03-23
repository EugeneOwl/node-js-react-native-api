import { databasePool } from "../../../db/data-base-pool";
import { BaseHttpError } from "../../../errors/base-http-error";

class TeamDatabaseValidator {

  async validateUniqueName(name: string): Promise<void> {
    const { rows } = await databasePool.query('SELECT id FROM teams WHERE name = $1', [name]);

    if (rows.length) {
      throw new BaseHttpError('Team with such name already exists.', 400);
    }
  }
}

const teamDatabaseValidator = new TeamDatabaseValidator();

export { teamDatabaseValidator }
