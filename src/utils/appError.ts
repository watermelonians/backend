import { error } from "console";

export default class AppError extends Error {
  status: number;

  message: string;

  isOperational: boolean;

  constructor(public statusCode: number = 500, public passedMessage: string) {
    super(passedMessage);
    this.message = passedMessage;
    // this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.status = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
