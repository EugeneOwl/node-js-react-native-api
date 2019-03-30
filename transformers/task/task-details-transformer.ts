import { TaskDetailsDatabaseRow } from "../../src/models/task/task-database-row";
import { dateTimeProcessorUtil } from "../../src/services/utils/date-time-processor-util";
import { TaskDetails } from "../../src/models/task/task-model";
import { Lookup } from "../../src/models/common/lookup-model";

class TaskDetailsTransformer {

  detailsDatabaseRowToDetails(row: TaskDetailsDatabaseRow, children: Lookup[]): TaskDetails {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      dateCreated: dateTimeProcessorUtil.dateToUiFormat(row.date_created),
      timeCreated: row.time_created.substring(0, 5),
      status: row.status_name,
      deadline: dateTimeProcessorUtil.dateToUiFormat(row.deadline_date),
      parent: { id: row.parent_id, name: row.parent_name },
      children: children,
      createdBy: { id: row.created_by_id, name: row.created_by_username },
      assignedBy: { id: row.assigned_by_id, name: row.assigned_by_username },
      assignedTo: { id: row.assigned_to_id, name: row.assigned_to_username }
    }
  }
}

const taskDetailsTransformer = new TaskDetailsTransformer();

export { taskDetailsTransformer }
