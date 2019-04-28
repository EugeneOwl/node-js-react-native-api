import { databasePool } from "../db/data-base-pool";
import { TaskDetailsDatabaseRow, TaskListDatabaseRow } from "../models/task/task-database-row";
import { taskListQueryBuilder } from "./utils/query-builders/task-list-query-builder";
import {
  TaskCreateRequest,
  TaskPreCreateData,
  TaskTimeline,
  TaskTimelog,
  TaskTimelogRequest,
  TaskTimelogUser
} from "../models/task/task-model";
import { Lookup } from "../models/common/lookup-model";
import { repositoryUtil } from "./utils/repository-util";
import { dateTimeProcessorUtil } from "../services/utils/date-time-processor-util";
import { TimeStamp } from "../models/common/time";

class TaskRepository {

  static readonly TABLE_NAME = 'tasks';
  static readonly SEQ_NAME = 'tasks_id_seq';

  static readonly TIME_LOG_TABLE_NAME = 'task_logs';
  static readonly TIME_LOG_SEQ_NAME = 'task_logs_id_seq';

  static readonly TIMELINE_TABLE_NAME = 'task_status_timelines';
  static readonly TIMELINE_SEQ_NAME = 'task_status_timelines_id_seq';

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

    const timelineId = await this.vacantTimelineId;
    await databasePool.query(this.ADD_TIMELINE_QUERY, [timelineId, createdBy, id, 1]);
  }

  async getDetails(id: number): Promise<TaskDetailsDatabaseRow[]> {
    const { rows } = await databasePool.query(this.DETAILS_QUERY, [id]);
    return rows as unknown as TaskDetailsDatabaseRow[];
  }

  async getChildren(id: number): Promise<Lookup[]> {
    const { rows } = await databasePool.query(this.CHILDREN_QUERY, [id]);
    return rows as unknown as Lookup[];
  }

  async getPreCreateData(projectId: number): Promise<TaskPreCreateData> {
    let { rows } = await databasePool.query(this.AVAILABLE_EXECUTORS_QUERY);
    const availableExecutors = rows as unknown as Lookup[];

    rows = (await databasePool.query(this.AVAILABLE_TASK_PARENTS_QUERY, [projectId])).rows;
    const availableParents = rows as unknown as Lookup[];

    return { executors: availableExecutors, parents: availableParents };
  }

  async getTimelog(id: number): Promise<TaskTimelog> {
    let { rows } = await databasePool.query(this.TIME_LOG_QUERY, [id]);
    const users = rows as unknown as TaskTimelogUser[];
    users.forEach(it => {
      it.timecreated = it.timecreated.substring(0, 5);
      it.timelogged = it.timelogged.substring(0, 5);
      // @ts-ignore
      it.datecreated = dateTimeProcessorUtil.dateToUiFormat(it.datecreated)
    });

    rows = (await databasePool.query(this.TOTAL_TIME_LOGGED_QUERY, [id])).rows;
    // @ts-ignore
    const total = rows[0].total as TimeStamp;

    rows = (await databasePool.query(this.NAME_QUERY, [id])).rows;
    // @ts-ignore
    const name = rows.length ? rows[0].name as string : '';

    return { id: id, name: name, total: total, users: users };
  }

  async addTimelog(log: TaskTimelogRequest): Promise<void> {
    const id = await this.vacantTimelogId;
    await databasePool.query(this.INSERT_TIME_LOG_QUERY,
      [id, log.comment, log.userId, log.taskId, `${log.hoursLogged}:${log.minutesLogged}:00`])
  }

  async getTimeline(pattern: string): Promise<TaskTimeline[]> {
    const { rows } =  await databasePool.query(this.TIMELINE_QUERY(pattern));
    const timelines = rows as unknown as TaskTimeline[];
    timelines.forEach(it => {
      it.timecreated = it.timecreated.substring(0, 5);
      // @ts-ignore
      it.datecreated = dateTimeProcessorUtil.dateToUiFormat(it.datecreated)
    });
    return timelines
  }

  async setStatus(id: number, statusId: number, userId: number): Promise<void> {
    await databasePool.query(this.UPDATE_STATUS_QUERY, [statusId, id]);

    const timelineId = await this.vacantTimelineId;
    await databasePool.query(this.ADD_TIMELINE_QUERY, [timelineId, userId, id, statusId]);
  }

  private get vacantId(): Promise<number> {
    return repositoryUtil.getVacantId(TaskRepository.SEQ_NAME, TaskRepository.TABLE_NAME);
  }

  private get vacantTimelogId(): Promise<number> {
    return repositoryUtil.getVacantId(TaskRepository.TIME_LOG_SEQ_NAME, TaskRepository.TIME_LOG_TABLE_NAME);
  }

  private get vacantTimelineId(): Promise<number> {
    return repositoryUtil.getVacantId(TaskRepository.TIMELINE_SEQ_NAME, TaskRepository.TIMELINE_TABLE_NAME);
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
  `;

  private readonly AVAILABLE_TASK_PARENTS_QUERY = `
SELECT id, name FROM tasks WHERE project_id = $1;
  `;

  private readonly TIME_LOG_QUERY = `
SELECT
  u.id,
  u.username,
  tl.date_created AS dateCreated,
  tl.time_created AS timeCreated,
  tl.time_logged AS timeLogged
FROM
  task_logs AS tl
    JOIN users AS u
      ON u.id = tl.user_id
  WHERE tl.task_id = $1
    ORDER BY tl.date_created, tl.time_created;  
  `;

  private readonly TOTAL_TIME_LOGGED_QUERY = `
SELECT SUM(time_logged) AS total FROM task_logs WHERE task_id = $1; 
  `;

  private readonly NAME_QUERY = `
  SELECT name FROM tasks WHERE id = $1;
  `;

  private readonly INSERT_TIME_LOG_QUERY = `
INSERT INTO task_logs
  (id, comment, user_id, task_id, time_logged)
VALUES
  ($1, $2, $3, $4, $5)
  `;

  private readonly TIMELINE_QUERY = (pattern: string) => `
SELECT
  t.id AS taskId,
  t.name AS taskName,
  u.id AS userId,
  u.username,
  tsl.date_created AS dateCreated,
  tsl.time_created AS timeCreated,
  ts.name AS status
FROM
  task_status_timelines as tsl
    JOIN tasks AS t
      ON t.id = tsl.task_id
    JOIN users AS u
      ON u.id = tsl.user_id
    JOIN task_statuses AS ts
      ON ts.id = tsl.task_status_id
    WHERE LOWER(t.name) LIKE LOWER('%${ pattern }%')
      ORDER BY tsl.date_created, tsl.time_created;
    `;

  private readonly UPDATE_STATUS_QUERY = `
UPDATE tasks SET task_status_id = $1 WHERE id = $2;
  `;

  private readonly ADD_TIMELINE_QUERY = `
INSERT INTO task_status_timelines
  (id, user_id, task_id, task_status_id)
  VALUES
  ($1, $2, $3, $4)  
  `;
}

const taskRepository = new TaskRepository();

export { taskRepository }
