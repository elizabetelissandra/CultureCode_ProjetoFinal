import { ApiProperty } from "@nestjs/swagger"
import { CategoryEnum } from "src/enum/category.enum"

export class ResponseProductDoc{
    @ApiProperty({ description: 'product identification', type: Number, example: 7, name: 'Id' })
    id: number;

    @ApiProperty({description: 'products name', type: String, example: 'Productivity Planner', name: 'Name'})
    name: string

    @ApiProperty({description: 'products price', type: Number, example: 24, name: 'Price'})
    price: number

    @ApiProperty({description: 'products category', enum: CategoryEnum, example: CategoryEnum.work, name: 'Category'})
    category: CategoryEnum

    @ApiProperty({description: 'if the product is in stock', type: Boolean, example: true, name: 'In Stock'})
    inStock: boolean

    
    @ApiProperty({ description: 'product creation date', type: Date, example: new Date(), name: 'Created At' })
    createdAt: Date;
    
    @ApiProperty({ description: 'product updated date', type: Date, example: new Date(), name: 'Updated At' })
    updatedAt: Date;

    @ApiProperty({ description: 'product deletion date', type: Date, example: null, name: 'Deleted At' })
    deletedAt: Date;
}