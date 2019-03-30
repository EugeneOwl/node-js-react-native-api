import { IdentifiableModel } from "../common/identifiable-model";

export interface UserListDatabaseRow extends IdentifiableModel {
  avatar: string;
  username: string;
  task_status: string;
  tasks_count: string;
}

export interface UserDetailsDatabaseRow extends IdentifiableModel {
  username: string;
  avatar: string;
  role_name: string;
  team_name: string;
  time_logged: string;
}
