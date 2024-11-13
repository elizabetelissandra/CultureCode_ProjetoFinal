import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { CategoryEnum } from "../../enum/category.enum"

export class CreateProdutsDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsEnum(CategoryEnum)
    @IsNotEmpty()
    category: CategoryEnum

    @IsBoolean()
    @IsNotEmpty()
    inStock: boolean

}