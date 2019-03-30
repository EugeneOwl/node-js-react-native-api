import { validatorUtil } from "./utils/validator-util";
import { TaskCreateRequest } from "../src/models/task/task-model";

class TaskValidator {

  validateCreate(createRequest: TaskCreateRequest): void {
    validatorUtil.validateId(
      createRequest.projectId,
      'Task create request must have project id and it must be positive number.'
    );

    validatorUtil.validateRequiredString(
      createRequest.name,
      'Task create request must have name and it must be not blank line.'
    );

    validatorUtil.validateId(
      createRequest.createdBy,
      'Task create request must have createdBy id and it must be positive number.'
    );
  }
}

const taskValidator = new TaskValidator();

export { taskValidator }
