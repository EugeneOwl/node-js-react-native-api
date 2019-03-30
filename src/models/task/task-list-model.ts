import { Lookup } from "../common/lookup-model";
import { IdentifiableModel } from "../common/identifiable-model";

export interface TaskListItem extends IdentifiableModel {
  name: string;
  status: string;
  assignedTo: Lookup;
  deadline: string;
}
