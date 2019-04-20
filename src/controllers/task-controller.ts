import { Request, Response } from 'express-serve-static-core';
import { taskService } from "../services/task-service";
import { RequestQueryKeys } from "../middlewares/request-query-middlewares/utils/request-query-keys";

class TaskController {

  async getAll(request: Request, response: Response): Promise<void> {
    const tasks = await taskService.getAll(
      request.query[RequestQueryKeys.PROJECT_ID],
      request.query[RequestQueryKeys.SEARCH_PATTERN],
      request.query[RequestQueryKeys.TASK_STATUS_ID],
      request.query[RequestQueryKeys.EXPIRED_ONLY]
    );
    response.send(tasks);
  }

  async add(request: Request, response: Response): Promise<void> {
    await taskService.add(request.body);
    response.send();
  }

  async getDetails(request: Request, response: Response): Promise<void> {
    const task = await taskService.getDetails(request.params.id);
    response.send(task);
  }

  async getPreCreateData(request: Request, response: Response): Promise<void> {
    const preCreateData = await taskService.getPreCreateData(request.query[RequestQueryKeys.PROJECT_ID]);
    response.send(preCreateData);
  }

  async getTimelog(request: Request, response: Response): Promise<void> {
    const timelog = await taskService.getTimelog(request.params.id);
    response.send(timelog);
  }

  async addTimelog(request: Request, response: Response): Promise<void> {
    await taskService.addTimelog(request.body);
    response.send({ status: 200 });
  }

  async getTimeline(request: Request, response: Response): Promise<void> {
    const timeline = await taskService.getTimeline(request.query[RequestQueryKeys.SEARCH_PATTERN]);
    response.send(timeline);
  }

  async setStatus(request: Request, response: Response): Promise<void> {
    await taskService.setStatus(
      request.params.id,
      request.query[RequestQueryKeys.TASK_STATUS_ID],
      request.query[RequestQueryKeys.USER_ID]
    );
    response.send();
  }

}

const taskController = new TaskController();

export { taskController };
