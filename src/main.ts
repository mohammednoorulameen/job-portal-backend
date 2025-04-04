import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Corrected path to serve static files from public folder
  app.useStaticAssets(path.join(__dirname, '..', 'Public'));

  await app.listen(4000);
  console.log('Server running on http://localhost:4000');
}
bootstrap();



// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import * as path from 'path';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);

//     // Enable CORS (optional)
//     app.enableCors();

//     // app.setGlobalPrefix('api');


//   /**
//    * serve static files 
//    */
//   app.useStaticAssets(path.join(__dirname,'...', 'public')) 

//   /**
//    * server port 
//    */

//   await app.listen(process.env.PORT ?? 4000);
// }
// bootstrap();
