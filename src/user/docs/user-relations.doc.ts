import { Jewels, Product } from "src/database/entities";
import { ResponseUserDoc } from "./response-user.doc";
import { ApiProperty } from "@nestjs/swagger";
import { ResponseCreateProductDoc } from "src/products/docs/response-create-products.doc";
import { ResponseCreateJewelsDoc } from "src/jewels/docs/response-create-jewels.doc";

export class UserRelationsDoc extends ResponseUserDoc{

    @ApiProperty({description: 'list of purchased products', type: ResponseCreateProductDoc})
    productsPurchased: ResponseCreateProductDoc[]

    @ApiProperty({type: ResponseCreateJewelsDoc})
    jewels: ResponseCreateJewelsDoc[]
}