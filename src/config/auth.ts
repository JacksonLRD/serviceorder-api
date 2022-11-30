import 'dotenv';
import { env } from 'process';

import { ENVS_NOT_DEFINED } from '../shared/constants/envConstants';
import AppError from '../shared/errors/AppError';

const { JWT_SECRET } = env;
if (!JWT_SECRET) throw new AppError(ENVS_NOT_DEFINED, 400);

export default {
  jwt: {
    secret: JWT_SECRET,
    expiresIn: '6h',
  },
};
