import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { RoleEnum } from "../../enum/role.enum"

export class RegisterDto{

    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsOptional()
    lastName: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsOptional()
    role?: RoleEnum

}