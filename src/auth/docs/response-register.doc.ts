import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../../enum/role.enum';

export class UserDoc {
  @ApiProperty({
    description: 'user identification',
    type: Number,
    example: 13,
    name: 'Id',
  })
  id: number;

  @ApiProperty({
    description: 'user first name',
    type: String,
    example: 'Diego Osvaldo',
    title: 'First Name',
  })
  firstName: string;

  @ApiProperty({
    description: 'user last name',
    type: String,
    example: 'Leonardo Rezende',
    title: 'Last Name',
    required: false
  })
  lastName: string;

  @ApiProperty({
    description: 'user email',
    type: String,
    example: 'diegoosvaldorezende@cladm.com.br',
    title: 'Email',
  })
  email: string;

  @ApiProperty({
    description: 'user password',
    type: String,
    example: '1234',
    title: 'Password',
  })
  password: string;

  @ApiProperty({
    description: 'user role',
    enum: RoleEnum,
    example: RoleEnum.admin,
    title: 'Role',
    required: false
  })
  role: RoleEnum;

  @ApiProperty({
    description: 'email is verified',
    type: Boolean,
    example: true,
    name: 'Email Verified',
  })
  emailVerified: boolean;

  @ApiProperty({
    description: 'coins that the user owns',
    type: Number,
    example: 0,
    name: 'Coins',
  })
  coins: number;

  @ApiProperty({
    description: 'User creation date',
    type: Date,
    example: new Date(),
    name: 'Created At',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'User update date',
    type: Date,
    example: new Date(),
    name: 'Updated At',
  })
  UpdatedAt: Date;

  @ApiProperty({
    description: 'User deletion date',
    type: Date,
    example: null,
    name: 'Deleted At',
  })
  DeletedAt: Date;
}
