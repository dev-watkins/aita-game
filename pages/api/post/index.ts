import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { methodValidator } from '../../../lib/api/validators/method';
import { PostHandler } from '../../../lib/api/handlers/postHandler';

const client = new PrismaClient();

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  const handler = new PostHandler([methodValidator('GET')], req, res, client);
  return handler.execute();
}
