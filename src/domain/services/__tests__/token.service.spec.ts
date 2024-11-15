import { TokenService } from "../token.service";
import { firebaseSpy } from "../../../infrastructure/utils/@mocks/external.mocks";
import { TokenRepositorySpy } from "../../../infrastructure/utils/@mocks/token.mocks";

describe("TokenService", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should call TokenRepository.createCustomToken with correct params", async () => {
    const tokenRepository = new TokenRepositorySpy(firebaseSpy);
    const sut = new TokenService(tokenRepository);
    await sut.getCustomToken({ authorization_token: "authorization_token" });
    expect(tokenRepository.getCustomToken).toHaveBeenCalledWith({
      authorization_token: "authorization_token",
    });
  });

  it("should return a access_token", async () => {
    const tokenRepository = new TokenRepositorySpy(firebaseSpy);
    const sut = new TokenService(tokenRepository);
    const access_token = await sut.getCustomToken({ authorization_token: "authorization_token" });
    expect(access_token).toBe("access_token");
  });
});
