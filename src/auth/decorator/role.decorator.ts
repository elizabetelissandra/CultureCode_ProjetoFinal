import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "../../enum/role.enum";

export const Roles_Key = 'roles';
export const Roles = (...roles: RoleEnum[]) => SetMetadata(Roles_Key, roles)