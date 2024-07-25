import {
  PipeTransform,
  BadRequestException,
  ArgumentMetadata,
} from "@nestjs/common";
import { ZodSchema } from "zod";

export class BodyValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      if (metadata.type === "body") {
        const parsedValue = this.schema.parse(value);
        return parsedValue;
      }
      return value;
    } catch (error) {
      throw new BadRequestException(error?.issues[0]?.message);
    }
  }
}
