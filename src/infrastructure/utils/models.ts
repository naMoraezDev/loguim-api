import { FastifyInstance } from "fastify";

export async function models(app: FastifyInstance) {
  app.addSchema({
    $id: "health",
    type: "object",
    properties: {
      message: { type: "string" },
      timestamp: { type: "number" },
      uptime: { type: "number" },
    },
  });

  app.addSchema({
    $id: "token request body",
    type: "object",
    properties: {
      authorization_token: { type: "string" },
    },
  });

  app.addSchema({
    $id: "token response",
    type: "object",
    properties: {
      access_token: { type: "string" },
    },
  });
}
