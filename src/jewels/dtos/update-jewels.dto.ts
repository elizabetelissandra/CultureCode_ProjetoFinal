import { PartialType } from "@nestjs/swagger";
import { CreateJewelsDto } from "./create-jewels.dto";

export class UpdateJewelsDto extends PartialType(CreateJewelsDto){}