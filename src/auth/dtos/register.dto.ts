import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { RoleEnum } from "../../enum/role.enum"

export class RegisterDto{

    @IsString({message: 'First Name is not valid'})
    @IsNotEmpty({message: 'First Name is required'})
    firstName: string

    @IsString()
    @IsOptional()
    lastName: string

    @IsEmail({}, {message: 'Email is not valid'})
    @IsNotEmpty({message: 'Email is required'})
    email: string

    @IsString()
    @IsNotEmpty({message: 'Password is required'})
    password: string

    @IsString()
    @IsOptional()
    role?: RoleEnum

}