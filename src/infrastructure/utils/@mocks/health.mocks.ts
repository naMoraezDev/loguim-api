import { HealthRepository } from "../../repositories/health.repository";
import { HealthServiceProtocol } from "../../../domain/services/health.service";

class HealthServiceSpy implements HealthServiceProtocol {
  constructor(readonly healthRepository: HealthRepository) {}

  checkApiHealth = jest.fn().mockResolvedValue({
    message: "OK",
    uptime: 0,
    timestamp: 0,
  });
}

class HealthRepositorySpy implements HealthServiceProtocol {
  checkApiHealth = jest.fn().mockResolvedValue({
    message: "OK",
    uptime: 0,
    timestamp: 0,
  });
}

const replySpy = {
  status: jest.fn().mockReturnValue({ send: jest.fn() }),
};

export { HealthRepositorySpy, HealthServiceSpy, replySpy };
