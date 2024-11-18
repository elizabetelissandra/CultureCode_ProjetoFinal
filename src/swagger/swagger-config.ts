import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Culture Code Documentation')
  .setDescription('This gamification system was developed to engage and reward a company’s users through a mechanism for purchasing and managing products and gems. The system allows users to purchase and manage Products using Gems as virtual currency, incentivizing participation and engagement through rewards. Administrators have full control over the system, including the ability to create, modify, and assign gems to users.')
  .addTag('cultureCode')
  .build();