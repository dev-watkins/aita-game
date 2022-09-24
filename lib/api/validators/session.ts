import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import type { NextAuthOptions } from 'next-auth';
import { UnauthorizedError } from '../errors';
import { UNAUTHORIZED } from '../errors/supportCodes';

export const sessionValidator =
  (res: NextApiResponse, authOptions: NextAuthOptions) =>
  async (req: NextApiRequest) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) throw new UnauthorizedError(UNAUTHORIZED);
  };
