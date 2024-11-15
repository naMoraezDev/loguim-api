import { TokenRepository } from "../../infrastructure/repositories/token.repository";

export namespace TokenServiceProtocol {
  export type Params = {
    authorization_token: string;
  };
}

export interface TokenServiceProtocol {
  getCustomToken(params: TokenServiceProtocol.Params): Promise<string | null>;
  getOneTapCustomToken(params: TokenServiceProtocol.Params): Promise<string>;
}

export class TokenService implements TokenServiceProtocol {
  constructor(readonly tokenRepository: TokenRepository) {}

  public async getCustomToken(params: TokenServiceProtocol.Params) {
    return await this.tokenRepository.getCustomToken({
      authorization_token: params.authorization_token,
    });
  }

  public async getOneTapCustomToken(params: TokenServiceProtocol.Params) {
    return await this.tokenRepository.getOneTapCustomToken({
      authorization_token: params.authorization_token,
    });
  }
}
