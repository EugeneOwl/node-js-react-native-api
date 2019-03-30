import { TaskListItem } from "../../src/models/task/task-list-model";
import { TaskListDatabaseRow } from "../../src/models/task/task-database-row";
import { dateTimeProcessorUtil } from "../../src/services/utils/date-time-processor-util";

class TaskListTransformer {

  listDatabaseRowToList(listDatabaseRow: TaskListDatabaseRow[]): TaskListItem[] {
    return listDatabaseRow.map(row => ({
      id: row.id,
      name: row.name,
      status: row.status_name,
      assignedTo: { id: row.assigned_to_id, name: row.assigned_to_username },
      deadline: dateTimeProcessorUtil.dateToUiFormat(row.deadline_date)
    }));
  }
}

const taskListTransformer = new TaskListTransformer();

export { taskListTransformer }
