import type { NextApiRequest } from 'next';
import { z } from 'zod';

export const bodyValidator =
  (schema: z.AnyZodObject) => (req: NextApiRequest) => {
    schema.parse(req.body);
  };
