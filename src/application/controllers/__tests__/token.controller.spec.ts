import { TokenController } from "../token.controller";
import {
  replySpy,
  requestSpy,
  TokenServiceSpy,
  TokenRepositorySpy,
} from "../../../infrastructure/utils/@mocks/token.mocks";
import { firebaseSpy } from "../../../infrastructure/utils/@mocks/external.mocks";

describe("TokenController", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should call TokenService.getCustomToken with correct params", async () => {
    const tokenService = new TokenServiceSpy(
      new TokenRepositorySpy(firebaseSpy)
    );
    const sut = new TokenController(tokenService);
    await sut.getCustomToken(requestSpy as any, replySpy as any);
    expect(tokenService.getCustomToken).toHaveBeenCalledWith({
      authorization_token: requestSpy.body.authorization_token,
    });
  });

  it("should call reply.status with 200 status code", async () => {
    const tokenService = new TokenServiceSpy(
      new TokenRepositorySpy(firebaseSpy)
    );
    const sut = new TokenController(tokenService);
    await sut.getCustomToken(requestSpy as any, replySpy as any);
    expect(replySpy.status).toHaveBeenCalledWith(200);
  });

  it("should call reply.send with correct params", async () => {
    const tokenService = new TokenServiceSpy(
      new TokenRepositorySpy(firebaseSpy)
    );
    const sut = new TokenController(tokenService);
    await sut.getCustomToken(requestSpy as any, replySpy as any);
    expect(replySpy.status().send).toHaveBeenCalledWith({
      access_token: "access_token",
    });
  });
});
