import { Global, Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { QrCode } from 'src/entities/qrCode.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Movie, QrCode])
  ],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
