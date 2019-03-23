import { Request, Response } from "express-serve-static-core";
import { userService } from "../services/user-service";
import { teamService } from "../services/team-service";

class TeamController {

  async getCandidates(request: Request, response: Response): Promise<void> {
    const users = await userService.getAllCandidates();
    response.send(users);
  }

  async add(request: Request, response: Response): Promise<void> {
    const created = await teamService.add(request.body);
    response.send(created);
  }

  async getAll(request: Request, response: Response): Promise<void> {
    const teams = await teamService.getAll();
    response.send(teams);
  }
}

const teamController = new TeamController();

export { teamController };
