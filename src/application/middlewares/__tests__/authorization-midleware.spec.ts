import { AuthorizationMiddleware } from "../authorization-middleware";
import { RejectFirebaseSpy } from "../../../infrastructure/utils/@mocks/external.mocks";

describe("AuthorizationMiddleware", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should throw an error when authorization_token is invalid", async () => {
    const firebase = new RejectFirebaseSpy();
    const authorizationMiddleware = new AuthorizationMiddleware(
      firebase as any
    );
    try {
      await authorizationMiddleware.authorize({ authorization_token: "authorization_token" });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
