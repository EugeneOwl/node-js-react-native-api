import { validatorUtil } from "./utils/validator-util";
import { TeamCreateRequest } from "../src/models/team/team-model";

class TeamValidator {

  validateCreate(createRequest: TeamCreateRequest): void {
    validatorUtil.validateId(
      createRequest.projectId,
      'Team create request must have project id and it must be positive number.'
    );

    validatorUtil.validateRequiredString(
      createRequest.name,
      'Team create request must have name and it must be not blank line.'
    );

    validatorUtil.validateId(
      createRequest.leader,
      'Team create request must have leader id and it must be positive number.'
    );

    validatorUtil.validateRequiredArrayOfIdentifiers(
      createRequest.members,
      'Team create request must have members identifiers and it must be array of unique positive numbers.'
    );
  }
}

const teamValidator = new TeamValidator();

export { teamValidator }
