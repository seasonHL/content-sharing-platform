import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as crypto from 'crypto';
import { MediaService } from 'src/media/media.service';
import { successResponse } from 'src/utils';
import * as COS from 'cos-nodejs-sdk-v5';
import { ConfigService } from '@nestjs/config';

@Controller('upload')
export class UploadController {
    bucket = 'season-1313247063';
    region = 'ap-chengdu';
    cos = new COS({});
    constructor(
        private readonly mediaService: MediaService,
        private readonly configService: ConfigService
    ) {
        // 从环境变量获取 SecretId 和 SecretKey，避免硬编码在代码中
        this.cos = new COS({
            SecretId: this.configService.get('COS_SECRET_ID'),
            SecretKey: this.configService.get('COS_SECRET_KEY'),
        });
    }
    uploadCos = async (file: Express.Multer.File) => {
        const bucket = this.bucket;
        const region = this.region;
        const md5Hash = crypto.createHash('md5').update(file.buffer).digest('hex');
        const key = `uploads/${md5Hash}${path.extname(file.originalname)}`;

        return new Promise((resolve, reject) => {
            this.cos.putObject({
                Bucket: bucket,
                Region: region,
                Key: key,
                Body: file.buffer,
            }, async (err) => {
                if (err) {
                    reject(err);
                } else {
                    const url = `https://${bucket}.cos.${region}.myqcloud.com/${key}`;
                    resolve(url)
                }
            })
        })
    }

    @Post('image')
    @UseInterceptors(FileInterceptor('image', {
        limits: { fileSize: 1024 * 1024 * 5 }, // 限制文件大小为 5MB
    }))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        const url = await this.uploadCos(file);
        return successResponse(url);
    }


    @Post('images')
    @UseInterceptors(FilesInterceptor('images'))
    async uploadImages(@UploadedFiles() files: Array<Express.Multer.File>) {
        const res = await Promise.all(files.map((file) => this.uploadCos(file)));
        return successResponse(res);
    }

}
