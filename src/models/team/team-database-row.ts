import { IdentifiableModel } from "../common/identifiable-model";

export interface TeamListDatabaseRow extends IdentifiableModel {
  name: string;
  leader_id: number;
  project_id: number;

  member_id: number;
  member_name: string;
  member_time_logged: string;
  member_role: string;
}
