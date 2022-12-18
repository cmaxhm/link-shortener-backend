import e, { Express } from "express";
import { router } from "./links.route";

export function apiMainRouter(app: Express): void {
  app.use(e.json());
  app.use('/', router);
}
