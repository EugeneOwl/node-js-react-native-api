import { databasePool } from "../db/data-base-pool";
import { repositoryUtil } from "./utils/repository-util";
import { TeamCreateRequest } from "../models/team/team-model";
import { teamDatabaseValidator } from "./utils/database-validators/team-database-validator";
import { TeamListDatabaseRow } from "../models/team/team-database-row";

class TeamRepository {

  static readonly TABLE_NAME = 'teams';
  static readonly SEQ_NAME = 'teams_id_seq';

  async add(createRequest: TeamCreateRequest): Promise<TeamListDatabaseRow[]> {
    await teamDatabaseValidator.validateUniqueName(createRequest.name, createRequest.projectId);

    const id = await this.vacantId;

    const { name, projectId, leader, members } = createRequest;
    await this.insertTeam(id, name, projectId, leader);

    members.forEach(async (id: number) => await this.insertMember(id, id));

    const { rows } = await databasePool.query(this.TEAM_LIST_ITEM_QUERY, [ id ]);

    return rows as TeamListDatabaseRow[];
  }

  async getAll(projectId: number): Promise<TeamListDatabaseRow[]> {
    const { rows } = await databasePool.query(this.TEAM_LIST_QUERY, [ projectId ]);
    return rows as TeamListDatabaseRow[];
  }

  private get vacantId(): Promise<number> {
    return repositoryUtil.getVacantId(TeamRepository.SEQ_NAME, TeamRepository.TABLE_NAME);
  }

  private insertTeam(id: number, name: string, projectId: number, leader: number): Promise<any> {
    return databasePool.query(this.INSERT_TEAM_QUERY, [ id, name, projectId, leader ]);
  }

  insertMember(teamId: number, memberId: number): Promise<any> {
    return databasePool.query(this.INSERT_MEMBER_QUERY, [ memberId, teamId ]);
  }

  private readonly INSERT_TEAM_QUERY = `
INSERT INTO teams (id, name, project_id, leader_id) VALUES ($1, $2, $3, $4)
  `;

  private readonly INSERT_MEMBER_QUERY = `
INSERT INTO team_user_relation (user_id, team_id) VALUES ($1, $2)
  `;

  private readonly TEAM_LIST_QUERY = `
SELECT t.id,
       t.name,
       t.leader_id,
       p.id AS project_id,
       u.id AS member_id,
       u.username AS member_name,
       u.time_logged AS member_time_logged,
       r.name AS member_role
  FROM teams AS t
    JOIN team_user_relation AS tur
      ON t.id = tur.team_id
    JOIN users AS u
      ON u.id = tur.user_id
    JOIN roles AS r
      ON r.id = u.role_id
    JOIN projects AS p
      ON p.id = t.project_id
    WHERE t.project_id = $1
      ORDER BY t.name, u.username;
  `;

  private readonly TEAM_LIST_ITEM_QUERY = `
SELECT t.id,
       t.name,
       t.leader_id,
       p.id AS project_id,
       u.id AS member_id,
       u.username AS member_name,
       u.time_logged AS member_time_logged,
       r.name AS member_role
  FROM teams AS t
    JOIN team_user_relation AS tur
      ON t.id = tur.team_id
    JOIN users AS u
      ON u.id = tur.user_id
    JOIN roles AS r
      ON r.id = u.role_id
    JOIN projects AS p
      ON p.id = t.project_id
      WHERE t.id = $1
      ORDER BY t.name, u.username;
  `;
}

const teamRepository = new TeamRepository();

export { teamRepository }
