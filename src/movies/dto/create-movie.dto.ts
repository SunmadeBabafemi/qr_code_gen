import { ApiProperty } from '@nestjs/swagger'
import {IsArray, IsString, IsNotEmpty,ArrayMinSize,} from 'class-validator'
import { IsFile } from 'src/common/decorators/isFile'

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty({message: 'title cannot be empty'})
  @ApiProperty()
  title: string

  @IsString()
  @IsNotEmpty({message: 'title cannot be empty'})
  @ApiProperty()
  year: string

  // @IsArray({m})
  // @IsFile({mime: ['image/jpg', 'image/png', 'image/jpeg']})
  @ApiProperty()
  // @ArrayMinSize(1, 
  //     {message: 'At Least An Image Must be Present'}
  // )
  images: File[]
}
