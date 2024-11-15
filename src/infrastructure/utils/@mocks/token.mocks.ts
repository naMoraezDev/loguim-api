import { TokenRepository } from "../../repositories/token.repository";
import { TokenServiceProtocol } from "../../../domain/services/token.service";

class TokenServiceSpy implements TokenServiceProtocol {
  constructor(readonly tokenRepository: TokenRepository) {}
  getCustomToken = jest.fn().mockResolvedValue("access_token");
  getOneTapCustomToken = jest.fn().mockResolvedValue("access_token");
}

class TokenRepositorySpy implements TokenServiceProtocol {
  constructor(readonly firebase: any) {}
  getCustomToken = jest.fn().mockResolvedValue("access_token");
  getOneTapCustomToken = jest.fn().mockResolvedValue("access_token");
}

const requestSpy = {
  body: { authorization_token: "authorization_token" },
};

const replySpy = {
  status: jest.fn().mockReturnValue({ send: jest.fn() }),
};

export { replySpy, requestSpy, TokenServiceSpy, TokenRepositorySpy };
