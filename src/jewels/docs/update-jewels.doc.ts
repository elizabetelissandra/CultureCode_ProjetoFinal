import { PartialType } from "@nestjs/swagger";
import { CreateJewelsDoc } from "./create-jewels.doc";

export class UpdateJewelsDoc extends PartialType(CreateJewelsDoc){}