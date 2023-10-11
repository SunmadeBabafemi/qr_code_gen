import { 
  Injectable,
   NotFoundException,
  BadRequestException, 
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { Repository } from 'typeorm';
import { QrResponse } from 'src/common/helpers/response';
import { QrCodeDto } from './dto/fetch-by-qr-code.dto';
import * as qrcode from 'qrcode';
import { QrCode } from 'src/entities/qrCode.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { imageUploader } from 'src/common/helpers/cloudinaryUpload';
import { generateRandomString } from 'src/common/helpers/random';
ConfigModule.forRoot()

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly MovieRepo: Repository<Movie>,
    @InjectRepository(QrCode)
    private readonly QrCodeRepo: Repository<QrCode>
  ){}
  async create(createMovieDto: CreateMovieDto, files: Express.Multer.File[]): Promise<Movie> {
    try {
      const existingMovie = await this.MovieRepo.findOne({
        where: {title: createMovieDto.title}
      })
      if(existingMovie){
        throw new BadRequestException(
          QrResponse.BadRequest(
            "Duplicate Values",
            "Movie With The Name Already Exists",
          )
        )
      }
      const image_arrays = []
      if(Number(files.length) > 0){
        for(const image of files){
          const image_url = await imageUploader(image.path)
          image_arrays.push(image_url)
        }
      }
      const movieData = {
        title: createMovieDto.title,
        year: createMovieDto.year,
        images: image_arrays
      }

      const newMovie = this.MovieRepo.create(movieData)
      await this.MovieRepo.save(newMovie)
      return newMovie
    } catch (error) {
      console.log("🚀 ~ file: movies.service.ts:57 ~ MoviesService ~ create ~ error:", error)
      throw new BadRequestException(
        QrResponse.BadRequest('internal Server error', error.message, '500')
      )
    }
    
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  async findByQRCode(qrCode: string | void): Promise<Movie[]> {
    try {
      // const fondQrCode = await this.QrCodeRepo.findOne({
      //   where:{code: qrCode}
      // })
      // if(!fondQrCode){
      //   throw new BadRequestException(
      //     QrResponse.BadRequest(
      //       "Not Found",
      //       "No QR Code Exists For This Link",
      //     )
      //   )
      // }
      const matchedMovies = await this.MovieRepo
      .createQueryBuilder()
      .setFindOptions({
        where: {
          isDeleted: false
        }
      })
      .limit(10)
      .orderBy("RANDOM()")
      .getMany()
      return matchedMovies
    } catch (error) {
      throw new BadRequestException(
        QrResponse.BadRequest('internal Server error', error.message, '500')
      )
    }
    
  }

 
  async generateQrCode(): Promise<QrCode | string> {
    try {
    //  const code = process.env.BASE_URL_FRONTEND+'/movies?code='+generateRandomString(5)
     const code = process.env.BASE_URL_FRONTEND+'/movies.html'
      
      const randomMovies = await this.findByQRCode()
      // console.log("🚀 ~ file: movies.service.ts:102 ~ MoviesService ~ generateQrCode ~ randomMovies:", randomMovies)

      // await qrcode.toString()

      let qrCodeDataURL = await qrcode.toDataURL(code)
      console.log("🚀 ~ file: movies.service.ts:108 ~ MoviesService ~ generateQrCode ~ qrCodeDataURL:", code)
  
      // const newQRcode = this.QrCodeRepo.create({
      //   code: qrCodeDataURL,
      //   // movies: randomMovies
      // })
      // await this.QrCodeRepo.save(newQRcode)
      // console.log("🚀 ~ file: movies.service.ts:92 ~ MoviesService ~ generateQrCode ~ newQRcode:", newQRcode)
      return qrCodeDataURL;
    } catch (error) {
       throw new BadRequestException(
        QrResponse.BadRequest('internal Server error', error.message, '500')
      )
    }
  }
}
