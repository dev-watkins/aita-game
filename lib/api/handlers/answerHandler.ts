import { PrismaClient, Post, User } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { BaseHandler } from './BaseHandler';
import { PostModel } from '../models/post';
import { UserModel } from '../models/user';
import { AnswerModel } from '../models/answer';

export class AnswerHandler extends BaseHandler {
  override async handle(): Promise<void> {
    const pm = new PostModel(this._prismaClient as PrismaClient);
    const um = new UserModel(this._prismaClient as PrismaClient);
    const am = new AnswerModel(this._prismaClient as PrismaClient);

    const session = await unstable_getServerSession(
      this._req,
      this._res,
      authOptions
    );
    const { postId, judgment } = this._req.body;

    const post = (await pm.get(postId)) as Post;
    const user = (await um.get(session?.user?.email as string)) as User;

    await am.create(user.id, judgment, post);

    const score = await am.getScore(user.id);
    const count = await am.count(user.id);
    const winRatio = Math.ceil((score / count) * 100) / 100;

    return this._res.status(200).json({ score, winRatio });
  }
}
