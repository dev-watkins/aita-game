import { PrismaClient, Prisma } from '@prisma/client';
import { cleanPost } from '../../cleanPost';

export class PostModel {
  private _client;

  constructor(client: PrismaClient) {
    this._client = client;
  }

  async get(redditId: string) {
    return this._client.post.findUnique({
      where: {
        redditId,
      },
    });
  }

  async create(data: Prisma.PostCreateInput) {
    return this._client.post.create({
      data: {
        ...data,
      },
    });
  }

  async lookupAndAdd(newPost: any) {
    const post = await this.get(newPost.id);

    if (post) return post;

    return this.create({
      redditId: newPost?.id,
      body: cleanPost(newPost.selftext_html),
      title: newPost.title,
      judgment: newPost.link_flair_text,
    });
  }
}
