import { databasePool } from "../db/data-base-pool";
import { TaskDetailsDatabaseRow, TaskListDatabaseRow } from "../models/task/task-database-row";
import { taskListQueryBuilder } from "./utils/query-builders/task-list-query-builder";
import { TaskCreateRequest, TaskPreCreateData } from "../models/task/task-model";
import { Lookup } from "../models/common/lookup-model";
import { repositoryUtil } from "./utils/repository-util";

class TaskRepository {

  static readonly TABLE_NAME = 'tasks';
  static readonly SEQ_NAME = 'tasks_id_seq';

  async getAll(projectId: number,
               pattern: string,
               taskStatusId: number,
               expiredOnly: boolean): Promise<TaskListDatabaseRow[]> {
    const query = taskListQueryBuilder.buildQuery(projectId, pattern, taskStatusId, expiredOnly);
    const { rows } = await databasePool.query(query);
    return rows as TaskListDatabaseRow[];
  }

  async add(createRequest: TaskCreateRequest): Promise<void> {
    const id = await this.vacantId;

    const { projectId, name, description, deadline, parent, createdBy, assignedTo } = createRequest;
    const assignedBy = assignedTo ? createdBy : null;


    await databasePool.query(
      this.INSERT_TASK_QUERY,
      [id, name, description, deadline, parent, createdBy, assignedBy, assignedTo, projectId]
    );
  }

  async getDetails(id: number): Promise<TaskDetailsDatabaseRow[]> {
    const { rows } = await databasePool.query(this.DETAILS_QUERY, [ id ]);
    return rows as unknown as TaskDetailsDatabaseRow[];
  }

  async getChildren(id: number): Promise<Lookup[]> {
    const { rows } = await databasePool.query(this.CHILDREN_QUERY, [ id ]);
    return rows as unknown as Lookup[];
  }

  async getPreCreateData(projectId: number): Promise<TaskPreCreateData> {
    let { rows } = await databasePool.query(this.AVAILABLE_EXECUTORS_QUERY);
    const availableExecutors = rows as unknown as Lookup[];

    rows = (await databasePool.query(this.AVAILABLE_TASK_PARENTS_QUERY, [projectId])).rows;
    const availableParents = rows as unknown as Lookup[];

    return { executors: availableExecutors, parents: availableParents };
  }

  private get vacantId(): Promise<number> {
    return repositoryUtil.getVacantId(TaskRepository.SEQ_NAME, TaskRepository.TABLE_NAME);
  }

  private readonly INSERT_TASK_QUERY = `
INSERT INTO tasks (
  id,
  name,
  description,
  task_status_id,
  deadline_date,
  parent_id,
  created_by,
  assigned_by,
  assigned_to,
  project_id
) VALUES ($1, $2, $3, 1, $4, $5, $6, $7, $8, $9);
  `;

  private readonly DETAILS_QUERY = `
SELECT
    t.name,
    t.description,
    t.date_created,
    t.time_created,
    ts.name AS status_name,
    t.deadline_date,
    tp.id AS parent_id,
    tp.name AS parent_name,
    t.created_by AS created_by_id,
    creator.username AS created_by_username,
    t.assigned_by AS assigned_by_id,
    assigner.username AS assigned_by_username,
    t.assigned_to AS assigned_to_id,
    executor.username AS assigned_to_username
  FROM tasks AS t
    JOIN task_statuses AS ts
      ON ts.id = t.task_status_id
    LEFT JOIN tasks AS tp
      ON tp.id = t.parent_id
    JOIN users AS creator
      ON creator.id = t.created_by
    LEFT JOIN users AS assigner
      ON assigner.id = t.assigned_by
    LEFT JOIN users AS executor
      ON executor.id = t.assigned_to
  WHERE t.id = $1;
  `;

  private readonly CHILDREN_QUERY = `
SELECT id, name FROM tasks WHERE parent_id = $1;
  `;

  private readonly AVAILABLE_EXECUTORS_QUERY = `
SELECT id, username AS name FROM users;
  `; // TODO filter executors according permissions

  private readonly AVAILABLE_TASK_PARENTS_QUERY = `
SELECT id, name FROM tasks WHERE project_id = $1;
  `;
}

const taskRepository = new TaskRepository();

export { taskRepository }
