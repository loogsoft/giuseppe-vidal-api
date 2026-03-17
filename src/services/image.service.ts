import { Injectable } from '@nestjs/common';
import { ImageEntity } from 'src/entities/image.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import cloudinary from 'src/config/cloudinary.config';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly repo: Repository<ImageEntity>,
  ) {}

  async uploadToCloudinary(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'products',
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(file.buffer);
    });
  }

  async createImages(files: Express.Multer.File[]): Promise<ImageEntity[]> {
    const images: ImageEntity[] = [];
    for (const file of files) {
      const uploadResult: any = await this.uploadToCloudinary(file);
      const image = this.repo.create({
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      });
      images.push(image);
    }
    return images;
  }

  async deleteImages(imageIds: string[]): Promise<void> {
    const images = await this.repo.findByIds(imageIds);

    for (const image of images) {
      await cloudinary.uploader.destroy(image.publicId);
      await this.repo.remove(image);
    }
  }
}
