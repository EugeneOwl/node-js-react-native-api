import { IdentifiableModel } from "../common/identifiable-model";

export interface TaskListDatabaseRow  extends IdentifiableModel {
  name: string;
  status_name: string;
  assigned_to_id: number;
  assigned_to_username: string;
  deadline_date: Date;
}

export interface TaskDetailsDatabaseRow extends IdentifiableModel {
  name: string;
  description: string;
  date_created: Date;
  time_created: string;
  status_name: string;
  deadline_date: Date;
  parent_id: number;
  parent_name: string;
  created_by_id: number;
  created_by_username: string;
  assigned_by_id: number;
  assigned_by_username: string;
  assigned_to_id: number;
  assigned_to_username: string;
}
