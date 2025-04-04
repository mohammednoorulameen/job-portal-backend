import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // Enable CORS (optional)
    app.enableCors();

    // app.setGlobalPrefix('api');


  /**
   * serve static files 
   */
  app.useStaticAssets(path.join(__dirname,'...', 'public')) 

  /**
   * server port 
   */

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
