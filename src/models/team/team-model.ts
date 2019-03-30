import { ProjectLimitedModel } from "../common/project-limited-model";

export interface TeamCreateRequest extends ProjectLimitedModel {
  name: string;
  leader: number;
  members: number[];
}
