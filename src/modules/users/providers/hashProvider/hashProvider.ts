import { createHmac } from 'node:crypto';
import { env } from 'process';
import { ENVS_NOT_DEFINED } from '../../../../shared/constants/envConstants';
import AppError from '../../../../shared/errors/AppError';

const hashProvider = () => {
  const { CRYPTO_ALGORITHM, SECRET } = env;
  if (!CRYPTO_ALGORITHM || !SECRET) throw new AppError(ENVS_NOT_DEFINED, 500);

  const self = {
    generateHash: async (password: string): Promise<string> => {
      return createHmac(CRYPTO_ALGORITHM, SECRET).update(password).digest('hex');
    },
    compareHash: async (password: string, hash: string): Promise<boolean> => {
      const hashToCompare = await hashProvider().generateHash(password);

      return hashToCompare === hash ? true : false;
    },
  };
  return self;
};

export default hashProvider();
