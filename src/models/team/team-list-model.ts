import { ProjectLimitedModel } from "../model";

export interface TeamListItem extends ProjectLimitedModel {
  id: number;
  name: string;
  timeLogged: string;
  members: TeamListItemMember[];
}

export interface TeamListItemMember {
  id: number;
  username: string;
  timeLogged: string;
  isTeamLeader: boolean;
  role: string;
}
