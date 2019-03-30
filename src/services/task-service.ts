import { taskRepository } from "../repositories/task-repository";
import { taskListTransformer } from "../../transformers/task/task-list-transformer";
import { TaskListItem } from "../models/task/task-list-model";
import { TaskCreateRequest, TaskDetails, TaskPreCreateData } from "../models/task/task-model";
import { taskValidator } from "../../validators/task-validator";
import { BaseHttpError } from "../errors/base-http-error";
import { taskDetailsTransformer } from "../../transformers/task/task-details-transformer";

class TaskService {

  async getAll(projectId: number,
               pattern: string,
               taskStatusId: number,
               expiredOnly: boolean): Promise<TaskListItem[]> {
    const databaseRows = await taskRepository.getAll(projectId, pattern, taskStatusId, expiredOnly);
    return taskListTransformer.listDatabaseRowToList(databaseRows);
  }

  async add(createRequest: TaskCreateRequest): Promise<void> {
    taskValidator.validateCreate(createRequest);

    await taskRepository.add(createRequest);
  }

  async getDetails(id: number): Promise<TaskDetails> {
    const databaseRows = await taskRepository.getDetails(id);

    if (databaseRows.length === 0) {
      throw new BaseHttpError('No task found by given id.', 404);
    }

    const children = await taskRepository.getChildren(id);

    return taskDetailsTransformer.detailsDatabaseRowToDetails(databaseRows[0], children);
  }

  async getPreCreateData(projectId: number): Promise<TaskPreCreateData> {
    return await taskRepository.getPreCreateData(projectId);
  }
}

const taskService = new TaskService();

export { taskService }
