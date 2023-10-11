import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { type } from 'os';

export class  multerOptions {
  @IsString()
  @IsNotEmpty()
  fieldname: string;

   @IsString()
  @IsNotEmpty()
  originalname: string;

  @IsString()
  @IsNotEmpty()
  encoding: string;

  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @IsNumber()
  @IsNotEmpty()
  size: number;

  @IsString()
  @IsNotEmpty()
  path: string;
  

}
