import { FastifyReply, FastifyRequest } from "fastify";
import { HealthService } from "../../domain/services/health.service";

export class HealthController {
  constructor(readonly healthService: HealthService) {}

  public async checkApiHealth(_request: FastifyRequest, reply: FastifyReply) {
    const health = await this.healthService.checkApiHealth();
    try {
      return reply.status(200).send(health);
    } catch (error) {
      return reply.status(503).send({ ...health, message: error });
    }
  }
}
