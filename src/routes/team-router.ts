import { Router } from 'express';
import { AppRouter } from "./app-router";
import { teamController } from "../controllers/team-controller";
import { projectIdMiddleware } from "../middlewares/request-query-middlewares/project-id-query-middleware";
import { userController } from "../controllers/user-controller";

class TeamRouter implements AppRouter {

  static TEAMS_URL = '/teams';
  static ADD_URL = TeamRouter.TEAMS_URL + '/new';

  setUpRoutes(routePrefix: string, router: Router): void {
    router.get(routePrefix + TeamRouter.TEAMS_URL, projectIdMiddleware.parseProjectId, teamController.getAll);
    router.get(routePrefix + TeamRouter.ADD_URL, projectIdMiddleware.parseProjectId,  teamController.getCandidates);
    router.post(routePrefix + TeamRouter.ADD_URL, teamController.add);
  }
}

const teamRouter = new TeamRouter();

export { teamRouter };
