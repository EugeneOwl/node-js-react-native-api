import { ProjectLimitedModel } from "../common/project-limited-model";
import { IdentifiableModel } from "../common/identifiable-model";

export interface TeamListItem extends ProjectLimitedModel, IdentifiableModel {
  name: string;
  timeLogged: string;
  members: TeamListItemMember[];
}

export interface TeamListItemMember extends IdentifiableModel {
  username: string;
  timeLogged: string;
  isTeamLeader: boolean;
  role: string;
}
