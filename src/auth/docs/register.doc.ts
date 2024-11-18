import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../../enum/role.enum';

export class RegisterDoc {
  @ApiProperty({
    description: 'The user first name',
    type: String,
    example: 'Diego Osvaldo',
    title: 'First Name',
  })
  firstName: string;

  @ApiProperty({
    description: 'The user last name',
    type: String,
    example: 'Leonardo Rezende',
    title: 'Last Name',
  })
  lastName: string;

  @ApiProperty({
    description: 'The user email',
    type: String,
    example: 'diegoosvaldorezende@cladm.com.br',
    title: 'Email',
  })
  email: string;

  @ApiProperty({
    description: 'The user password',
    type: String,
    example: '1234',
    title: 'Password',
  })
  password: string;

  @ApiProperty({
    description: 'The user role',
    enum: RoleEnum,
    example: RoleEnum.admin,
    title: 'Role',
    required: false
  })
  role: RoleEnum;
}
