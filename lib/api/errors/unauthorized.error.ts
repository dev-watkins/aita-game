export class UnauthorizedError extends Error {
  supportCode;

  constructor(supportCode: string) {
    super(`Unauthorized`);
    this.supportCode = supportCode;
  }
}
