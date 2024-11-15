import { TokenRepository } from "../token.repository";
import { FirebaseSpy } from "../../utils/@mocks/external.mocks";

describe("TokenRepository", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should return a custom token", async () => {
    const firebase = new FirebaseSpy();
    const sut = new TokenRepository(firebase as any);
    const result = await sut.getCustomToken({
      authorization_token: "authorization_token",
    });
    expect(result).toBe("access_token");
  });
});
