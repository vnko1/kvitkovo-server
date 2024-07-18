import { ArgumentsHost, HttpStatus } from "@nestjs/common";

export abstract class AppService {
  constructor() {}

  protected exceptionResponse(host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    return function (
      type: string,
      message: string,
      status: HttpStatus,
      description?: string
    ) {
      const errorResponse = {
        statusCode: status,
        path: request.url,
        errorType: type,
        errorMessage: message,
      };
      if (description) errorResponse["data"] = description;
      return response.status(status).json(errorResponse);
    };
  }
}
