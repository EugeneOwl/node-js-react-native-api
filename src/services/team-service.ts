import { teamRepository } from "../repositories/team-repository";
import { teamValidator } from "../../validators/team-validator";
import { TeamCreateRequest } from "../models/team/team-model";
import { teamListTransformer } from "../../transformers/team/team-list-transformer";
import { TeamListItem } from "../models/team/team-list-model";

class TeamService {

  async add(createRequest: TeamCreateRequest): Promise<TeamListItem[]> {
    teamValidator.validateCreate(createRequest);

    if (!this.leaderIncludedToTeamMembers(createRequest)) {
      createRequest.members.push(createRequest.leader);
    }

    const databaseRows = await teamRepository.add(createRequest);

    return teamListTransformer.listDatabaseRowToList(databaseRows);
  }

  async getAll(projectId: number): Promise<TeamListItem[]> {
    const databaseRows = await teamRepository.getAll(projectId);
    return teamListTransformer.listDatabaseRowToList(databaseRows);
  }

  private leaderIncludedToTeamMembers(team: TeamCreateRequest): boolean {
    return team.members.includes(team.leader)
  }
}

const teamService = new TeamService();

export { teamService }
