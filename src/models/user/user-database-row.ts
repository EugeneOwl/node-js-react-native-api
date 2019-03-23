export interface UserListDatabaseRow {
  id: number;
  avatar: string;
  username: string;
  task_status: string;
  tasks_count: string;
}

export interface UserDetailsDatabaseRow {
  id: number;
  username: string;
  avatar: string;
  role_name: string;
  team_name: string;
  time_logged: string;
}
