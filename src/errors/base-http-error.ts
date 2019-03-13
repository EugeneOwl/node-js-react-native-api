export class BaseHttpError {
  message: string;
  status: number;

  constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
  }

  toString(): string {
    return `{ message: '${ this.message }', status: ${ this.status } }`;
  }
}
