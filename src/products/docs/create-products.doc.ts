import { ApiProperty } from "@nestjs/swagger"
import { CategoryEnum } from "../../enum/category.enum"

export class CreateProductDoc{
    
    @ApiProperty({description: 'products name', type: String, example: 'Wireless Keyboard', name: 'Name'})
    name: string

    @ApiProperty({description: 'products price', type: Number, example: 89, name: 'Price'})
    price: number

    @ApiProperty({description: 'products category', enum: CategoryEnum, example: CategoryEnum.tech, name: 'Category'})
    category: CategoryEnum

    @ApiProperty({description: 'if the product is in stock', type: Boolean, example: true, name: 'In Stock'})
    inStock: boolean

}