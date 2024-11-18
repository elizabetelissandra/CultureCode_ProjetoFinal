import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/database/entities';

export class ResponseRewardDoc {
  @ApiProperty({
    description: 'information about the success of the purchase',
    type: String,
    example: 'Product purchased successfully',
    name: 'Message',
  })
  message: string;

  @ApiProperty({
    description: 'buyer and purchase information',
    type: User,
    example: {
        id: 4,
        firstName: 'Diego Osvaldo',
        role: 'admin',
        coins: '187',
        productsPurchased: {
        id: 7,
        name: 'Productivity Planner',
        price: 24,
        category: 'Workplace_Benefits',
        inStock: true,
        createdAt: '2024-11-13T22:25:43.639Z',
        updatedAt: '2024-11-14T11:48:08.634Z',
        deleteAt: null,
      },
    },
    name: 'User'
  })
  user: User;
}
