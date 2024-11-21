import { ApiProperty } from "@nestjs/swagger"
import { RoleEnum } from "../../enum/role.enum"

export class ResponseUserDoc{
    @ApiProperty({description: 'user identification', type: Number, example: 4, name: 'Id'})
    id: number
    
    @ApiProperty({description: 'user first name', type: String, example: 'Diego Osvaldo', name: 'First Name'})
    firstName: string

    @ApiProperty({description: 'user last name', type: String, example: 'Leonardo Rezende', name: 'Last Name'})
    lastName: string

    @ApiProperty({description: 'user email', type: String, example: 'diegoosvaldorezende@cladm.com.br', name: 'Email'})
    email: string

    @ApiProperty({description: 'user role', enum: RoleEnum, example: RoleEnum.admin, name: 'Role'})
    role: RoleEnum

    @ApiProperty({description: 'if the user is verified', type: Boolean, example: true, name: 'Email Verified'})
    emailVerified: boolean

    @ApiProperty({description: 'user coins', type: Number, example: 211, name: 'Coins'})
    coins: number

    @ApiProperty({ description: 'user creation date', type: Date, example: new Date(), name: 'Created At' })
    createdAt: Date;
    
    @ApiProperty({ description: 'user updated date', type: Date, example: new Date(), name: 'Updated At' })
    updatedAt: Date;

    @ApiProperty({ description: 'user deletion date', type: Date, example: null, name: 'Deleted At' })
    deletedAt: Date;


}