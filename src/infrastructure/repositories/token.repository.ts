import { jwtDecode, JwtPayload } from "jwt-decode";
import { firebaseAdmin } from "../firebase/firebase-admin";
// import { BadRequestError } from "../errors/error-instances/bad-requests";
import { TokenServiceProtocol } from "../../domain/services/token.service";
import { UnauthorizedError } from "../errors/error-instances/unauthorized";

interface CustomJwtPayload extends JwtPayload {
  hd: string;
  name: string;
  email: string;
  picture: string;
}

export class TokenRepository implements TokenServiceProtocol {
  constructor(readonly firebase: typeof firebaseAdmin) {}

  public async getCustomToken(params: TokenServiceProtocol.Params) {
    const decoded = await this.firebase
      .auth()
      .verifyIdToken(params.authorization_token)
      .catch(() => null);
    if (!decoded) {
      return null;
    }
    const uid = decoded?.uid;
    return await this.firebase.auth().createCustomToken(uid);
  }

  public async getOneTapCustomToken(params: TokenServiceProtocol.Params) {
    let decoded: CustomJwtPayload;
    try {
      decoded = jwtDecode<CustomJwtPayload>(params.authorization_token);
    } catch {
      throw new UnauthorizedError();
    }
    /* if (decoded.hd !== "domain.com.br") {
      throw new BadRequestError("Invalid domain.");
    } */
    const user = await this.firebase
      .auth()
      .getUserByEmail(decoded.email)
      .catch(() => null);
    if (user) {
      return await this.firebase.auth().createCustomToken(user.uid);
    } else {
      const { uid, email, phoneNumber, displayName, photoURL } =
        await this.firebase.auth().createUser({
          emailVerified: true,
          email: decoded.email,
          photoURL: decoded.picture,
          displayName: decoded.name,
        });
      await this.firebase.auth().updateUser(uid, {
        providerToLink: {
          uid,
          email,
          photoURL,
          phoneNumber,
          displayName,
          providerId: "google.com",
        },
      });
      return await this.firebase.auth().createCustomToken(uid);
    }
  }
}
