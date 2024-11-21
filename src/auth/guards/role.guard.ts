import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RoleEnum } from "../../enum/role.enum";
import { Roles_Key } from "../decorator/role.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(Roles_Key, [
            context.getHandler(),
            context.getClass()
        ])
        if(!requiredRoles){
            return true;
        }

        const request = context.switchToHttp().getRequest()

        const {user} = request

        return requiredRoles.some((role) => role === user.userRole)
    }
}