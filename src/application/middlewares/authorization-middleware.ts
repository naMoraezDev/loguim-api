import { firebaseAdmin } from "../../infrastructure/firebase/firebase-admin";

export interface AuthorizationMiddlewareProtocol {
  authorize: (params: AuthorizationMiddlewareProtocol.Params) => Promise<void>;
}

export namespace AuthorizationMiddlewareProtocol {
  export type Params = {
    authorization_token: string;
  };
}

export class AuthorizationMiddleware
  implements AuthorizationMiddlewareProtocol
{
  constructor(readonly firebase: typeof firebaseAdmin) {}

  async authorize({ authorization_token }: AuthorizationMiddlewareProtocol.Params) {
    await this.firebase.auth().verifyIdToken(authorization_token);
  }
}
