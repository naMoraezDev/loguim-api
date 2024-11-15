import { HealthController } from "../health.controller";
import {
  replySpy,
  HealthServiceSpy,
  HealthRepositorySpy,
} from "../../../infrastructure/utils/@mocks/health.mocks";

describe("HealthController", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should call HealtService.checkApiHealth correctly", async () => {
    const healthService = new HealthServiceSpy(new HealthRepositorySpy());
    const sut = new HealthController(healthService);
    await sut.checkApiHealth({} as any, replySpy as any);
    expect(healthService.checkApiHealth).toHaveBeenCalled();
  });

  it("should call reply.status with 200 status code on promise resolve", async () => {
    const healthService = new HealthServiceSpy(new HealthRepositorySpy());
    const sut = new HealthController(healthService);
    await sut.checkApiHealth({} as any, replySpy as any);
    expect(replySpy.status).toHaveBeenCalledWith(200);
  });
});
