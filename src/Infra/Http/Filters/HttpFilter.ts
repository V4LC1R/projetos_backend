import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Exception } from '@shared/Exceptions';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: any = null;

    // Trata sua Exception personalizada
    if (exception instanceof Exception) {
      status = exception.statusCode;
      message = exception.message;
    }
    // Trata exceções HTTP padrão do Nest
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      
      if (typeof response === 'object') {
        message = (response as any).message || message;
        details = (response as any).details;
      } else {
        message = response as string;
      }
    }
    // Trata outros tipos de erro (como ValidationError)
    else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}