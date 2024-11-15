import { z } from "zod";
import { FastifyInstance } from "fastify";
import { TokenService } from "../../domain/services/token.service";
import { firebaseAdmin } from "../../infrastructure/firebase/firebase-admin";
import { TokenController } from "../../application/controllers/token.controller";
import { TokenRepository } from "../../infrastructure/repositories/token.repository";

export async function tokenRouter(app: FastifyInstance) {
  app.post(
    "/token",
    {
      schema: {
        tags: ["token"],
        summary:
          "Validates an authorization token and returns an access token.",
        body: z.object({
          authorization_token: z.string(),
        }),
        response: {
          200: z.object({
            access_token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      await new TokenController(
        new TokenService(new TokenRepository(firebaseAdmin))
      ).getCustomToken(request, reply);
    }
  );

  app.post(
    "/onetap",
    {
      schema: {
        tags: ["token"],
        summary:
          "Validates a google jwt authorization token and returns an access token.",
        body: z.object({
          authorization_token: z.string(),
        }),
        response: {
          200: z.object({
            access_token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      await new TokenController(
        new TokenService(new TokenRepository(firebaseAdmin))
      ).getOneTapCustomToken(request, reply);
    }
  );
}
