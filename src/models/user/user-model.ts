import { ProjectLimitedModel } from "../model";
import { Lookup } from "../common/lookup-model";

export interface UserCreateRequest extends ProjectLimitedModel {
    username: string;
    roleId: number;
    teamId: number;
    password: string;
    avatar: string;
}

export interface UserCandidate {
    id: number;
    username: string;
    avatar: string;
}

export interface UserDetails {
  id: number;
  username: string;
  avatar: string;
  teams: string[];
  role: string;
  timeLogged: string;
}

export interface UserPreCreateData {
  teams: Lookup[];
  roles: Lookup[];
}
