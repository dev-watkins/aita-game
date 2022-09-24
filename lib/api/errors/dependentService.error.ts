export class DependentServiceError extends Error {
  supportCode;
  constructor(service: string, supportCode: string) {
    super(`Dependent service (${service}) failed`);
    this.supportCode = supportCode;
  }
}
