import { PrismaClient } from '@prisma/client';
import { BaseHandler } from './BaseHandler';
import { RedditAgent } from '../reddit/redditAgent';
import { PostModel } from '../models/post';

export class PostHandler extends BaseHandler {
  override async handle() {
    const ra = new RedditAgent();
    const post = await ra.fetchPost();

    const pm = new PostModel(this._prismaClient as PrismaClient);

    return this._res.status(200).json(await pm.lookupAndAdd(post));
  }
}
