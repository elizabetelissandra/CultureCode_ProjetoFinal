import { CanActivate, ExecutionContext } from "@nestjs/common";
import { RoleEnum } from "../../enum/role.enum";
export const authGuardMock: CanActivate = {
    canActivate: jest.fn((context: ExecutionContext) =>{
        const request = context.switchToHttp().getRequest()

        request['user'] = {
            userId: 13,
            userRole: RoleEnum.admin
        }
        return true
    })

    
}