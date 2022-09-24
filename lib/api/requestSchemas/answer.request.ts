import { z } from 'zod';

export const AnswerRequest = z.object({
  postId: z.string().min(5),
  judgment: z.string(),
});
