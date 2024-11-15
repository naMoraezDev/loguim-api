import { FastifyReply, FastifyRequest } from "fastify";
import { TokenService } from "../../domain/services/token.service";
import { UnauthorizedError } from "../../infrastructure/errors/error-instances/unauthorized";

export class TokenController {
  constructor(readonly tokenService: TokenService) {}

  public async getCustomToken(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as { authorization_token: string };
    const { authorization_token } = body;
    if (!authorization_token) {
      throw new UnauthorizedError();
    }
    const access_token = await this.tokenService.getCustomToken({ authorization_token });
    if (!access_token) {
      throw new UnauthorizedError();
    }
    return reply.status(200).send({ access_token });
  }

  public async getOneTapCustomToken(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const body = request.body as { authorization_token: string };
    const { authorization_token } = body;
    if (!authorization_token) {
      throw new UnauthorizedError();
    }
    const access_token = await this.tokenService.getOneTapCustomToken({
      authorization_token,
    });
    return reply.status(200).send({ access_token });
  }
}
