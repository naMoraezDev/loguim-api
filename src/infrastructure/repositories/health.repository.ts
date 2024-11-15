import { HealthServiceProtocol } from "../../domain/services/health.service";

export class HealthRepository implements HealthServiceProtocol {
  public async checkApiHealth() {
    return {
      message: "OK",
      timestamp: Date.now(),
      uptime: process.uptime(),
    };
  }
}
