import { SetMetadata } from "@nestjs/common";
import { RolesEnum } from "src/types";

export const RIGHTS_KEY = "rights";
export const Rights = (...role: RolesEnum[]) => SetMetadata(RIGHTS_KEY, role);
