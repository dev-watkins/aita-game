import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { authOptions } from './auth/[...nextauth]';
import { methodValidator } from '../../lib/api/validators/method';
import { sessionValidator } from '../../lib/api/validators/session';
import { ScoreHandler } from '../../lib/api/handlers/scoreHandler';

const client = new PrismaClient();

export default async function score(req: NextApiRequest, res: NextApiResponse) {
  const handler = new ScoreHandler(
    [methodValidator('GET'), sessionValidator(res, authOptions)],
    req,
    res,
    client
  );

  return handler.execute();
}
