import { FastifyInstance } from "fastify";
import { tokenRouter } from "./token/token.router";
import { healthRouter } from "./health/helth.router";

export async function routes(app: FastifyInstance) {
  app.register(healthRouter);
  app.register(tokenRouter, { prefix: "/oauth2/authorize" });
}
