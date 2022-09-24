export class InvalidMethodError extends Error {
  supportCode;

  constructor(received: string, supportCode: string) {
    super(`Cannot ${received}`);
    this.supportCode = supportCode;
  }
}
