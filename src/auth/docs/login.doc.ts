import { ApiProperty } from "@nestjs/swagger";

export class LoginDoc{
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
}