import { ApiProperty } from "@nestjs/swagger"
import { ResponseProductDoc } from "./response-product.doc"

export class ResponseFindAllProductsDoc{
        
    @ApiProperty({description: 'page on which it is being displayed',type: Number, example: 1,  name: 'Page'})
    page: number
    
    @ApiProperty({description: 'limit of products to be displayed', type: Number, example: 5, name: 'Limit'})
    limit: number
    
    @ApiProperty({description: 'total products to be displayed', type: Number, example: 1, name: 'Total'})
    total: number
    
    @ApiProperty({description: 'products found', type: ResponseProductDoc, name: 'Data' })
    data: ResponseProductDoc
}