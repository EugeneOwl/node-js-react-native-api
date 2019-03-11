import { User, UserCreateRequest } from "../models/user";
import { userRepository } from "../repositories/user-repository";

export class UserService {

  async getAll(): Promise<User[]> {
    return await userRepository.getAll();
  }

  async add(user: UserCreateRequest): UserCrea {
    // TODO think of user creation and editing flow and implement needed logic

    // TODO add transformers as separate pattern and folder to convert entity DTOs and vise versa

    // TODO implement validators as separate pattern and folder to validate form data

    // TODO investigate how to solve if error lower then in controller occurs and client needs response with status 500

    // TODO use password service to encrypt password before saving
  }
}

const userService = new UserService();

export { userService }