import { Router } from 'express';
import { AppRouter } from "./app-router";
import { teamController } from "../controllers/team-controller";

class TeamRouter implements AppRouter {

  static TEAMS_URL = '/teams';
  static ADD_URL = TeamRouter.TEAMS_URL + '/new';

  setUpRoutes(routePrefix: string, router: Router): void {
    router.get(routePrefix + TeamRouter.TEAMS_URL, teamController.getAll);
    router.get(routePrefix + TeamRouter.ADD_URL, teamController.getCandidates);
    router.post(routePrefix + TeamRouter.ADD_URL, teamController.add);
  }
}

const teamRouter = new TeamRouter();

export { teamRouter };
