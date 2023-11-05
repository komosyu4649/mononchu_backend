import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { tables } from './app.tables';
import { StuffModule } from './stuff/stuff.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_CONTAINER_NAME,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      logger: 'debug',
      entities: tables,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    StuffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
