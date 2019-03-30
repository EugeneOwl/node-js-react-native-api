import { ProjectLimitedModel } from "../common/project-limited-model";
import { Lookup } from "../common/lookup-model";
import { IdentifiableModel } from "../common/identifiable-model";

export interface TaskCreateRequest extends ProjectLimitedModel {
  name: string;
  description?: string;
  deadline?: string;
  parent?: number;
  createdBy: number;
  assignedTo?: number;
}

export interface TaskPreCreateData {
  executors: Lookup[],
  parents: Lookup[]
}

export interface TaskDetails extends IdentifiableModel {
  name: string;
  description?: string;
  dateCreated: string;
  timeCreated: string;
  status: string;
  deadline?: string;
  parent?: Lookup;
  children?: Lookup[];
  createdBy?: Lookup;
  assignedBy?: Lookup;
  assignedTo?: Lookup;
}
