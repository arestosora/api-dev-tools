import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Ha ocurrido un error.';

        if (exception instanceof BadRequestException) {
            const validationErrors = exception.getResponse();
            status = HttpStatus.BAD_REQUEST;
            message = 'Errores de validación';
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                message,
                errors: validationErrors['message'],
            });
        } else {
            if (exception instanceof HttpException) {
                status = exception.getStatus();
                message = exception.message || message;
            }
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                message,
            });
        }
    }
}
