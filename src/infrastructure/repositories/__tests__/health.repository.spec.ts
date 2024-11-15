import { HealthRepository } from "../health.repository";

describe("HealthRepository", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should return a health check object", async () => {
    const sut = new HealthRepository();
    const result = await sut.checkApiHealth();
    expect(result).toHaveProperty("uptime");
    expect(result).toHaveProperty("message");
    expect(result).toHaveProperty("timestamp");
  });
});
