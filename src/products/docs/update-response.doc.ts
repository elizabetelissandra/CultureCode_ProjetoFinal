import { PartialType } from "@nestjs/swagger";
import { CreateProductDoc } from "./create-products.doc";

export class UpdateProductDoc extends PartialType(CreateProductDoc){}