import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../database/entities';

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
        id: 9,
		name: "Tablet with pen",
		price: 100,
		category: "Technology",
		inStock: true,
		buyer: [
			{
				id: 13,
				firstName: "Rebeca Lívia",
				lastName: "Raquel Ferreira",
				email: "rebeca_ferreira@grupoitamaraty.com.br",
				role: "admin",
				emailVerified: true,
				coins: 4900,
				createdAt: "2024-11-13T13:04:08.258Z",
				updatedAt: "2024-11-29T18:14:52.221Z",
				deleteAt: null,
      	}
		]
	},
    name: 'Product'
  })
  user: User;
}
