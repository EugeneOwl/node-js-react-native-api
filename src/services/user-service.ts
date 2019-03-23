import { userRepository } from "../repositories/user-repository";
import { userListTransformer } from "../../transformers/user/user-list-transformer";
import { userValidator } from "../../validators/user-validator";
import { userDetailsTransformer } from "../../transformers/user/user-details-transformer";
import { UserCandidate, UserCreateRequest, UserDetails, UserPreCreateData } from "../models/user/user-model";
import { UserListItem } from "../models/user/user-list-model";
import { BaseHttpError } from "../errors/base-http-error";

class UserService {

  async getAll(projectId: number): Promise<UserListItem[]> {
    const databaseRows = await userRepository.getAll(projectId);
    return userListTransformer.listDatabaseRowToList(databaseRows);
  }

  async getAllCandidates(projectId: number): Promise<UserCandidate[]> {
    return await userRepository.getAllCandidates(projectId);
  }

  async add(createRequest: UserCreateRequest): Promise<UserListItem> {
    userValidator.validateCreate(createRequest);

    const databaseRows = await userRepository.add(createRequest);

    return userListTransformer.listDatabaseRowToList(databaseRows)[0];
  }

  async getDetails(id: number): Promise<UserDetails> {
    const databaseRows = await userRepository.getDetails(id);

    if (databaseRows.length === 0) {
      throw new BaseHttpError('No user found by given id.', 404);
    }

    return userDetailsTransformer.detailsDatabaseRowToDetails(databaseRows);
  }

  async getPreCreateData(projectId: number): Promise<UserPreCreateData> {
    return await userRepository.getPreCreateData(projectId);
  }
}

const userService = new UserService();

export { userService }
