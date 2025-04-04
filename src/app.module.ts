import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JobsModule } from './jobs/jobs.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST') || 'localhost',
        port: +configService.get('DB_PORT') || 5432,
        username: configService.get('DB_USER')  || 'postgres',
        password: configService.get('DB_PASSWORD') || 'noor@123',
        database: configService.get('DB_NAME') || "job_management",
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    JobsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


// type: 'postgres',
//         host: process.env.DB_HOST  || 'localhost',
//         port: Number(process.env.DB_PORT)  || 5432,
//         username: process.env.DB_USER || 'postgres',
//         password:  process.env.DB_PASSWORD || 'noor@123',
//         database:  process.env.DB_NAME || "job_management",
//         entities: [join(process.cwd(), 'dist/**/*.entity.js')],
//         autoLoadEntities: true,
//         synchronize: true,