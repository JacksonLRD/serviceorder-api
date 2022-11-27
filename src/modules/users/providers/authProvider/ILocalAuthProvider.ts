import { userPayload } from './UserPayload';

export default interface ILocalAuthProvider {
  authenticate(payload: userPayload): Promise<string>;
}
