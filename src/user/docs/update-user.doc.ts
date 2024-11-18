import { PartialType } from "@nestjs/swagger";
import { RegisterDoc } from "../../auth/docs/register.doc";


export class UpdateUserDoc extends PartialType(RegisterDoc){
    
}