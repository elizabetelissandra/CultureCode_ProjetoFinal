import { ApiProperty } from "@nestjs/swagger";
import { TransactionEnum } from "../../enum/transaction.enum";

export class ResponseDistribuiteJewelsDoc {

  @ApiProperty({ description: 'jewel identification', type: Number, example: 9, name: 'Id' })
  id: number;
  
  @ApiProperty({ description: 'jewels name', type: String, example: 'Inclusion Stone', name: 'Name' })
  name: string;
 
  @ApiProperty({ description: 'jewels price', type: Number, example: 60, name: 'Price' })
  price: number;
  
  @ApiProperty({ description: 'jewels description', type: String, example: 'Prêmio por promover a inclusão e diversidade no ambiente de trabalho.', name: 'Description' })
  description: string;
  
  @ApiProperty({ description: 'jewels transaction type', enum: TransactionEnum, example: TransactionEnum.G, name: 'Transaction Type' })
  transactionType: TransactionEnum;
  
  @ApiProperty({ description: 'jewels active', type: Boolean, example: false, name: 'Active' })
  active: boolean;
}
