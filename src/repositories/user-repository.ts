import { databasePool } from "../db/data-base-pool";
import { UserCandidate, UserCreateRequest, UserDetails, UserPreCreateData } from "../models/user/user-model";
import { UserDetailsDatabaseRow, UserListDatabaseRow } from "../models/user/user-database-row";
import { userDatabaseValidator } from "./utils/database-validators/user-list-database-validator";
import { repositoryUtil } from "./utils/repository-util";
import { passwordSerrvice } from "../security/password-service";
import { teamRepository } from "./team-repository";
import { Lookup } from "../models/common/lookup-model";

class UserRepository {

  static readonly TABLE_NAME = 'users';
  static readonly SEQ_NAME = 'users_id_seq';

  async getAll(projectId: number): Promise<UserListDatabaseRow[]> {
    const { rows } = await databasePool.query(this.USER_LIST_QUERY, [ projectId ]);
    return rows as UserListDatabaseRow[];
  }

  async findPasswordByUsername(username: string): Promise<string> {
    const { rows } = await databasePool.query(this.PASSWORD_BY_USERNAME_QUERY, [ username ]);
    // @ts-ignore
    return rows.length ? rows[0].password as string : '';
  }

  async getAllCandidates(projectId: number): Promise<UserCandidate[]> {
    const { rows } = await databasePool.query(this.CANDIDATES_QUERY, [ projectId ]);
    return rows as unknown as UserCandidate[];
  }

  async add(createRequest: UserCreateRequest): Promise<UserListDatabaseRow[]> {
    await userDatabaseValidator.validateUniqueUsername(createRequest.username, createRequest.projectId);

    const id = await this.vacantId;

    const { username, projectId, roleId, teamId, password, avatar } = createRequest;
    const passwordHash = await passwordSerrvice.encryptPassword(password);

    await databasePool.query(this.INSERT_USER_QUERY, [ id, username, projectId, roleId, passwordHash, avatar ]);
    if (teamId) {
      await teamRepository.insertMember(teamId, id);
    }

    const { rows } = await databasePool.query(this.USER_LIST_ITEM_QUERY, [ id ]);

    return rows as UserListDatabaseRow[];
  }

  async getDetails(id: number): Promise<UserDetailsDatabaseRow[]> {
    const { rows } = await databasePool.query(this.DETAILS_QUERY, [ id ]);
    return rows as unknown as UserDetailsDatabaseRow[];
  }

  async getPreCreateData(projectId: number): Promise<UserPreCreateData> {
    let { rows } = await databasePool.query(this.AVAILABLE_ROLES_QUERY);
    const availableRoles = rows as unknown as Lookup[];

    rows = (await databasePool.query(this.AVAILABLE_TEAMS_QUERY, [ projectId ])).rows;
    const availableTeams = rows as unknown as Lookup[];

    return { teams: availableTeams, roles: availableRoles };
  }

  private get vacantId(): Promise<number> {
    return repositoryUtil.getVacantId(UserRepository.SEQ_NAME, UserRepository.TABLE_NAME);
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

  private readonly USER_LIST_ITEM_QUERY = `
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
    WHERE u.id = $1
      GROUP BY u.id, ts.name, t.assigned_to
        ORDER BY u.username, ts.name;  
  `;

  private readonly CANDIDATES_QUERY = `
SELECT
   id,
   username,
   avatar
  FROM users
    WHERE project_id = $1
      ORDER BY username
  `;

  private readonly PASSWORD_BY_USERNAME_QUERY = `
SELECT password FROM users WHERE username = $1
  `;

  private readonly INSERT_USER_QUERY = `
INSERT INTO users (id, username, project_id, role_id, password, avatar) VALUES ($1, $2, $3, $4, $5, $6)
  `;

  private readonly DETAILS_QUERY = `
SELECT
   u.id,
   u.username,
   u.avatar,
   r.name AS role_name,
   t.name AS team_name,
   u.time_logged
  FROM users AS u
    JOIN roles AS r
      ON r.id = u.role_id
    LEFT JOIN team_user_relation AS tur
      ON tur.user_id = u.id
    LEFT JOIN teams AS t
      ON t.id = tur.team_id
    WHERE u.id = $1;
  `;

  private readonly AVAILABLE_ROLES_QUERY = `
SELECT id, name FROM roles;
  `;

  private readonly AVAILABLE_TEAMS_QUERY = `
SELECT id, name FROM teams WHERE project_id = $1;
  `;
}

const userRepository = new UserRepository();

export { userRepository }
