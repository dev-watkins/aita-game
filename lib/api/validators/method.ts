import type { NextApiRequest } from 'next';
import { InvalidMethodError } from '../errors';
import { INVALID_METHOD } from '../errors/supportCodes';

export const methodValidator =
  (validMethod: string) => (req: NextApiRequest) => {
    if (validMethod !== req.method) {
      throw new InvalidMethodError(req.method as string, INVALID_METHOD);
    }
  };
