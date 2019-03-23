import { teamRepository } from "../repositories/team-repository";
import { teamValidator } from "../../validators/team-validator";
import { TeamCreateRequest } from "../models/team/team-model";
import { TeamListItem } from "../models/team/team-list-model";

class TeamService {

  async add(createRequest: TeamCreateRequest): Promise<TeamListItem[]> {
    teamValidator.validateCreate(createRequest);

    if (!this.leaderIncludedToTeamMembers(createRequest)) {
      createRequest.members.push(createRequest.leader);
    }

    return await teamRepository.add(createRequest);
  }

  async getAll(): Promise<TeamListItem[]> {
    return await teamRepository.getAll();
  }

  private leaderIncludedToTeamMembers(team: TeamCreateRequest): boolean {
    return team.members.includes(team.leader)
  }
}

const teamService = new TeamService();

export { teamService }
