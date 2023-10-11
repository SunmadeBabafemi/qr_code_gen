import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QrResponse } from 'src/common/helpers/response';
import { QrCodeDto } from './dto/fetch-by-qr-code.dto';
import { generateRandomString } from 'src/common/helpers/random';
import { AnyFilesInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {Express} from 'express'
import { diskStorage } from 'multer';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('/add-new')
  @UseInterceptors(FilesInterceptor('images', 6, {preservePath: true, dest: '../files', storage: diskStorage({}) }))
  @ApiOperation({summary: "Create A Movie"})
  async createMovieWithImages(
    @UploadedFiles(
      new ParseFilePipe({
        validators:[
          new MaxFileSizeValidator({maxSize: 1000000, message:"File Cannot Exeed 1mb"})
        ]
      })
    ) files: Express.Multer.File[],
    @Body() createMovieDto: CreateMovieDto,
    
    ) {
    // console.log("🚀 ~ file: movies.controller.ts:27 ~ MoviesController ~ files:", files)

    const movieResponse = await this.moviesService.create(createMovieDto, files);
    return QrResponse.Ok(movieResponse, "Movie Created Successfully", '201')
  }


  @Get('/find-by-qr-code')
  @ApiOperation({summary: "find movies by QR code"})
  async fetchMoviesByQrCode(@Query('code') code: string) {
    const movieResponse = await this.moviesService.findByQRCode(code);
    return QrResponse.Ok(movieResponse, "Movies Fetched Successfully", '200')
  }

  @Get('/generate-qr-code')
  @ApiOperation({summary: "generates QR Code"})
  async generateQrCode() {
    const qrCodeResponse = await this.moviesService.generateQrCode();
    return QrResponse.Ok(qrCodeResponse, "QR Code Generated Successfully", '201')
  }

}
