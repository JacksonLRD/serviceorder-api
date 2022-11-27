import UserPayload from '../payload/UserPayload';

export default interface UserAuthenticationService {
  execute(payload: UserPayload): Promise<string>;
}
