import { BadRequestException } from '@nestjs/common';
import { cloudinary} from './config/cloudinaryConfig'
import { QrResponse } from './response';

export const imageUploader = async (file: string) => {
  try {
    console.log("Uploading to cloudinary");
    const {secure_url} = await cloudinary.uploader.upload(file,{
      folder: "movies_images",
      // compressing images
      transformation: [
        { width: 480, aspect_ratio: "1.0", crop: "fill" },
        { fetch_format: "webp" },
      ],

      // transformation: [
      //     {aspect_ratio: "1.8", width: 1920, crop: "fill"},
      // ],

      secure: true,
    })
    return secure_url
  } catch (error) {
    throw new BadRequestException(
      QrResponse.BadRequest(
        "internal server error",
        error.message,
        "500"
      )
    )
  }
}