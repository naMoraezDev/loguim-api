import { HealthService } from "../health.service";
import { HealthRepositorySpy } from "../../../infrastructure/utils/@mocks/health.mocks";

describe("HeathService", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should call HealthRepository.checkApiHealth correctly", async () => {
    const healthRepository = new HealthRepositorySpy();
    const sut = new HealthService(healthRepository);
    await sut.checkApiHealth();
    expect(healthRepository.checkApiHealth).toHaveBeenCalled();
  });

  it("should return a health check object", async () => {
    const healthRepository = new HealthRepositorySpy();
    const sut = new HealthService(healthRepository);
    const health = await sut.checkApiHealth();
    expect(health).toEqual({
      message: "OK",
      uptime: 0,
      timestamp: 0,
    });
  });
});
