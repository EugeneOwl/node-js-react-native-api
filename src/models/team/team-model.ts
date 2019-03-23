import { ProjectLimitedModel } from "../model";

export interface TeamCreateRequest extends ProjectLimitedModel {
  name: string;
  leader: number;
  members: number[];
}
