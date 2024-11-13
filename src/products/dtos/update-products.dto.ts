import { PartialType } from "@nestjs/swagger";
import { CreateProdutsDto } from "./create-products.dto";

export class UpdateProductsDto extends PartialType(CreateProdutsDto){}