import { FastifyInstance } from "fastify";
import { HealthService } from "../../domain/services/health.service";
import { healthSchema } from "../../domain/schemas/health/health.schema";
import { HealthController } from "../../application/controllers/health.controller";
import { HealthRepository } from "../../infrastructure/repositories/health.repository";

export async function healthRouter(app: FastifyInstance) {
  app.get(
    "/health",
    {
      schema: {
        tags: ["health"],
        summary: "Verifica a saúde e o desempenho da api.",
        response: {
          200: healthSchema,
        },
      },
    },
    async (request, reply) => {
      await new HealthController(
        new HealthService(new HealthRepository())
      ).checkApiHealth(request, reply);
    }
  );
}
