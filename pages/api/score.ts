import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { authOptions } from './auth/[...nextauth]';
import { methodValidator } from '../../lib/api/validators/method';
import { sessionValidator } from '../../lib/api/validators/session';
import { ScoreHandler } from '../../lib/api/handlers/scoreHandler';

export default async function score(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = new PrismaClient();
    const handler = new ScoreHandler(
      [methodValidator('GET'), sessionValidator(res, authOptions)],
      req,
      res,
      client
    );

    return handler.execute();
  } catch (e) {
    console.log(e);
    return res.status(500).send('');
  }
}
