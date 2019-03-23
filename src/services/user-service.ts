import { userRepository } from "../repositories/user-repository";
import { UserListItem, UserCandidate, UserCreateRequest } from "../models/user/user-model";
import { userListTransformer } from "../../transformers/user-list-transformer";

class UserService {

  async getAll(projectId: number): Promise<UserListItem[]> {
    const databaseRows = await userRepository.getAll(projectId);
    return userListTransformer.listDatabaseRowToList(databaseRows);
  }

  async getAllCandidates(): Promise<UserCandidate[]> {
    return await userRepository.getAllCandidates();
  }

  async add(user: UserCreateRequest) {
  }
}

const userService = new UserService();

export { userService }
