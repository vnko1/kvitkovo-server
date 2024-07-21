import { RightPermissionsEnum, RolesEnum } from "src/types/enums";

export type RightsType = {
  [key in RolesEnum]: RightPermissionsEnum;
};
