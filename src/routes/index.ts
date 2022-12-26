import e, { Express } from "express";
import { router } from "./links.route";
const cors = require("cors");

export function apiMainRouter(app: Express): void {
  app.use(e.json());
  app.use(cors());
  app.use('/', router);
}
