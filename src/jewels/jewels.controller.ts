import { Controller, UseGuards } from '@nestjs/common';
import { JewelsService } from './jewels.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('jewels')
export class JewelsController {
  constructor(private readonly jewelsService: JewelsService) {}

 
}
