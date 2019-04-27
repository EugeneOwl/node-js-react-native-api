class TaskListQueryBuilder {

  buildQuery(projectId: number, pattern: string, taskStatusId: number, expiredOnly: boolean): string {
    let query = this.TASK_LIST_BASE_QUERY(projectId);

    if (!pattern && !taskStatusId && !expiredOnly) {
      return query;
    }

    if (pattern) {
      query += ` AND (LOWER(t.name) LIKE LOWER('%${ pattern }%') OR LOWER(t.description) LIKE LOWER('%${ pattern }%'))`;
    }

    if (taskStatusId) {
      query += ' AND ts.id = ' + taskStatusId;
    }

    if (expiredOnly) {
      query += ' AND deadline_date < now() AND t.task_status_id IN (1, 2)';
    }

    query += ' ORDER BY t.name';

    return query;
  }

  private readonly TASK_LIST_BASE_QUERY = (projectId: number) => `
SELECT
   t.id,
   t.name,
   ts.name AS status_name,
   u.id AS assigned_to_id,
   u.username AS assigned_to_username,
   t.deadline_date
  FROM tasks AS t
    JOIN task_statuses AS ts
      ON ts.id = t.task_status_id
    LEFT JOIN users AS u
      ON u.id = t.assigned_to
    WHERE t.project_id = ${ projectId }
  `;
}

const taskListQueryBuilder = new TaskListQueryBuilder();

export { taskListQueryBuilder }
