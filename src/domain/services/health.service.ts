import { healthSchema } from "../schemas/health/health.schema";
import { HealthRepository } from "../../infrastructure/repositories/health.repository";

export interface HealthServiceProtocol {
  checkApiHealth(): Promise<typeof healthSchema._type>;
}

export class HealthService implements HealthServiceProtocol {
  constructor(readonly healthRepository: HealthRepository) {}

  public async checkApiHealth() {
    return await this.healthRepository.checkApiHealth();
  }
}
