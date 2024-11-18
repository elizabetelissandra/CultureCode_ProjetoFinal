import { ApiProperty } from "@nestjs/swagger";
import { CreateProductDoc } from "./create-products.doc";

export class ResponseCreateProductDoc extends CreateProductDoc{

    @ApiProperty({ description: 'product identification', type: Number, example: 9, name: 'Id' })
    id: number;
    
    @ApiProperty({ description: 'product creation date', type: Date, example: new Date(), name: 'Created At' })
    createdAt: Date;
    
    @ApiProperty({ description: 'product updated date', type: Date, example: new Date(), name: 'Updated At' })
    updatedAt: Date;

    @ApiProperty({ description: 'product deletion date', type: Date, example: null, name: 'Deleted At' })
    deletedAt: Date;
}