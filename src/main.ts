import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder().setTitle('Culture Code Documentation').setDescription('Este sistema de gamificação foi desenvolvido para engajar e recompensar os usuários de uma empresa por meio de um mecanismo de compra e gerenciamento de produtos e joias. O sistema permite que usuários possam adquirir e gerenciar Produtos usando Joias como moeda virtual, incentivando a participação e o engajamento por meio de recompensas. Administradores possuem controle total sobre o sistema, incluindo a capacidade de criar, modificar e atribuir joias aos usuários.').addTag('cultureCode').build();

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup('api', app, documentFactory)
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
