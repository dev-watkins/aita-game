import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import * as errors from '../errors';
import * as sc from '../errors/supportCodes';

export class BaseHandler {
  private _validators;
  protected _req;
  protected _res;
  protected _prismaClient;

  constructor(
    validators: Array<(req: NextApiRequest) => void>,
    req: NextApiRequest,
    res: NextApiResponse,
    pc?: PrismaClient
  ) {
    this._validators = validators;
    this._req = req;
    this._res = res;
    this._prismaClient = pc || null;
  }

  async handle() {
    throw new Error('method not implemented');
  }

  async execute() {
    try {
      await Promise.all(
        this._validators.map((validator) => validator(this._req))
      );
      return await this.handle();
    } catch (e) {
      console.error(e);
      if (e instanceof errors.InvalidMethodError) {
        return this._res.status(404).json({
          message: e.message,
          supportCode: e.supportCode,
        });
      } else if (e instanceof errors.DependentServiceError) {
        return this._res.status(500).json({
          message: e.message,
          supportCode: e.supportCode,
        });
      } else if (e instanceof errors.UnauthorizedError) {
        return this._res.status(401).json({
          message: e.message,
          supportCode: e.supportCode,
        });
      } else if (e instanceof z.ZodError) {
        return this._res.status(400).json({
          message: 'Bad Request',
          supportCode: sc.BAD_REQUEST,
        });
      }
    }
    return this._res.status(500).json({
      message: 'unexpected error',
      supportCode: sc.UNKNOWN,
    });
  }
}
