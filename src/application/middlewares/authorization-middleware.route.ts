import { FastifyRequest } from "fastify";
import { AuthorizationMiddleware } from "./authorization-middleware";
import { firebaseAdmin } from "../../infrastructure/firebase/firebase-admin";
import { UnauthorizedError } from "../../infrastructure/errors/error-instances/unauthorized";

export async function authorizationMiddleware(request: FastifyRequest) {
  const { authorization } = request.headers as { authorization?: string };
  try {
    await new AuthorizationMiddleware(firebaseAdmin).authorize({
      authorization_token: authorization || "",
    });
  } catch {
    throw new UnauthorizedError();
  }
}
