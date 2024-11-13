import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { TransactionEnum } from "../../enum/transaction.enum"

export class CreateJewelsDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsString()
    @IsOptional()
    description: string

    @IsEnum(TransactionEnum)
    @IsNotEmpty()
    transactionType: TransactionEnum

    @IsBoolean()
    @IsOptional()
    active: boolean

}