import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty} from 'class-validator'

export class QrCodeDto {
  @IsString()
  @IsNotEmpty({message: 'title cannot be empty'})
  @ApiProperty()
  code: string
}
