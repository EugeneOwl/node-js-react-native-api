import { Router } from "express";

export interface AppRouter {

  setUpRoutes(routePrefix: string, router: Router): void;
}
