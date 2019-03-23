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

export interface TeamListDatabaseRow {
  id: number;
  name: string;
  leader_id: number;
  project_id: number;

  member_id: number;
  member_name: string;
  member_time_logged: string;
  member_role: string;
}
