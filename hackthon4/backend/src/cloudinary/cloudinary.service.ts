import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';
import streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    folder: string,
    preset: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const stream = new Readable();
      stream.push(file.buffer);
      stream.push(null);
      const upload = v2.uploader.upload_stream(
        {
          folder,
          upload_preset: preset,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      stream.pipe(upload);
    });
  }

  async deleteImage(publicId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.error('Error deleting image:', error);
          resolve(false);
        } else {
          console.log('Image deleted:', result);
          resolve(true);
        }
      });
    });
  }
}
