import { validatorUtil } from "./utils/validator-util";
import { TeamCreateRequest } from "../src/models/team/team-model";
import { UserCreateRequest } from "../src/models/user/user-model";

class UserValidator {

  validateCreate(createRequest: UserCreateRequest): void {
    validatorUtil.validateId(
      createRequest.projectId,
      'User create request must have project id and it must be positive number.'
    );

    validatorUtil.validateRequiredString(
      createRequest.username,
      'User create request must have username and it must be not blank line.'
    );

    validatorUtil.validateId(
      createRequest.roleId,
      'User create request must have role id and it must be positive number.'
    );

    if (createRequest.teamId) {
      validatorUtil.validateId(
        createRequest.teamId,
        'User create request teams id must be positive number or absent at all.'
      );
    }

    validatorUtil.validateRequiredString(
      createRequest.password,
      'User create request must have password and it must be not blank line.'
    );
  }
}

const userValidator = new UserValidator();

export { userValidator }
