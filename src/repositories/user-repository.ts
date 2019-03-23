import { databasePool } from "../db/data-base-pool";
import { UserCandidate } from "../models/user/user-model";
import { UserListDatabaseRow } from "../models/user/user-list-model";

class UserRepository {

  async getAll(projectId: number): Promise<UserListDatabaseRow[]> {
    const { rows } = await databasePool.query(this.USER_LIST_QUERY, [projectId]);
    return rows as UserListDatabaseRow[];
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

  private readonly USER_LIST_QUERY = `
SELECT
   u.id,
   u.avatar,
   u.username,
   ts.name AS task_status,
   (SELECT COUNT(t.id) WHERE t.assigned_to = u.id) AS tasks_count
  FROM users AS u
    LEFT JOIN tasks AS t
      ON t.assigned_to = u.id
    LEFT JOIN task_statuses ts
      ON ts.id = t.task_status_id
    WHERE u.project_id = $1
      GROUP BY u.id, ts.name, t.assigned_to
        ORDER BY u.username, ts.name;  
  `;
}

const userRepository = new UserRepository();

export { userRepository }
