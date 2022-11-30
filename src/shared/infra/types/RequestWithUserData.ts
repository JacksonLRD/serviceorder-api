import { Request } from 'express';
import TokenPayload from '../../../modules/users/interfaces/payload/TokenPayload';

export default interface RequestWithUserData extends Request {
  user: TokenPayload;
}
