import { PrismaClient, Prisma } from '@prisma/client';

export class UserModel {
  private _client;

  constructor(client: PrismaClient) {
    this._client = client;
  }

  async get(email: string) {
    return this._client.user.findUnique({
      where: {
        email,
      },
    });
  }
}
