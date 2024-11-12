import { RoleEnum } from "../../enum/role.enum";

export class UserDecoratorDTO{
    
    userId: number;
    userEmail: string;
    userRole: RoleEnum;
    iss: string;
    aud: string;
}