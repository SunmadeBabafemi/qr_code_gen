import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ScheduleModule.forRoot(
    ),
    TypeOrmModule.forRoot(AppDataSource.options)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
