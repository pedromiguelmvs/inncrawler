import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Algo deu errado, tente novamente mais tarde!';

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      if (exception.name === 'BadRequestException') {
        message = (exception.getResponse() as any).message;
      }
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
