import { databasePool } from "../../../db/data-base-pool";
import { BaseHttpError } from "../../../errors/base-http-error";

class TeamDatabaseValidator {

  async validateUniqueName(name: string, projectId: number): Promise<void> {
    const { rows } = await databasePool.query(this.COUNT_BY_NAME, [name, projectId]);

    // @ts-ignore
    if (parseInt(rows[0].count, 10) !== 0) {
      throw new BaseHttpError('Team with such name already exists on needed project.', 400);
    }
  }

  private COUNT_BY_NAME = `
SELECT COUNT(id) FROM teams WHERE name = $1 AND project_id = $2
  `;
}

const teamDatabaseValidator = new TeamDatabaseValidator();

export { teamDatabaseValidator }
