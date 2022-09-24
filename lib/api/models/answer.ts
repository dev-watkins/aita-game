import { PrismaClient, Prisma, Post } from '@prisma/client';

export class AnswerModel {
  private _client;

  constructor(client: PrismaClient) {
    this._client = client;
  }

  async create(userId: string, judgment: string, post: Post) {
    return this._client.answer.create({
      data: {
        userId,
        judgment,
        postId: post.id,
        correct: post.judgment === judgment,
      },
    });
  }

  async getScore(userId: string) {
    return this._client.answer.count({
      where: {
        correct: true,
        userId,
      },
    });
  }

  async count(userId: string) {
    return this._client.answer.count({
      where: {
        userId,
      },
    });
  }
}
