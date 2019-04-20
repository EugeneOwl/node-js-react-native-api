import { ProjectLimitedModel } from "../common/project-limited-model";
import { Lookup } from "../common/lookup-model";
import { IdentifiableModel } from "../common/identifiable-model";
import { TimeStamp } from "../common/time";

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

export interface TaskTimelog extends IdentifiableModel {
  name: string;
  total: TimeStamp;
  users: TaskTimelogUser[];
}

export interface TaskTimelogUser extends IdentifiableModel {
  username: string;
  timelogged: string;
  datecreated: string | Date;
  timecreated: string;
}

export interface TaskTimelogRequest {
  userId: number;
  taskId: number;
  comment: string;
  hoursLogged: number;
  minutesLogged: number;
}

export interface TaskTimeline {
  taskid: number;
  taskname: string;
  userid: number;
  username: string;
  datecreated: string;
  timecreated: string;
  status: string;
}
