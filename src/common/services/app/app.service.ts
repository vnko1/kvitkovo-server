import { ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Request } from "express";
import * as bcrypt from "bcrypt";

export abstract class AppService {
  constructor() {}

  protected async checkPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

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

  protected extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
