import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]';
import { methodValidator } from '../../../lib/api/validators/method';
import { sessionValidator } from '../../../lib/api/validators/session';
import { bodyValidator } from '../../../lib/api/validators/body';
import { AnswerRequest } from '../../../lib/api/requestSchemas/answer.request';
import { AnswerHandler } from '../../../lib/api/handlers/answerHandler';

const client = new PrismaClient();

export default async function answer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const handler = new AnswerHandler(
    [
      methodValidator('POST'),
      sessionValidator(res, authOptions),
      bodyValidator(AnswerRequest),
    ],
    req,
    res,
    client
  );

  return handler.execute();
}
