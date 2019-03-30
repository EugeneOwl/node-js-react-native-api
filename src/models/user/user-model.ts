import { ProjectLimitedModel } from "../common/project-limited-model";
import { Lookup } from "../common/lookup-model";
import { IdentifiableModel } from "../common/identifiable-model";

export interface UserCreateRequest extends ProjectLimitedModel {
    username: string;
    roleId: number;
    teamId: number;
    password: string;
    avatar: string;
}

export interface UserCandidate extends IdentifiableModel {
    username: string;
    avatar: string;
}

export interface UserDetails extends IdentifiableModel {
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
