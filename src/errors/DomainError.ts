export class DomainValidationError {
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}