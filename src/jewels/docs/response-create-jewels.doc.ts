import { ApiProperty } from '@nestjs/swagger';
import { CreateJewelsDoc } from './create-jewels.doc';

export class ResponseCreateJewelsDoc extends CreateJewelsDoc {
  
    @ApiProperty({ description: 'jewel identification', type: Number, example: 9, name: 'Id' })
  id: number;
  
  @ApiProperty({ description: 'jewel creation date', type: Date, example: new Date(), name: 'Created At' })
  createdAt: Date;
  
  @ApiProperty({ description: 'jewel updated date', type: Date, example: new Date(), name: 'Updated At' })
  updatedAt: Date;
}
