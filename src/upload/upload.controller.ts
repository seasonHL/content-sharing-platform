import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as crypto from 'crypto';
import { MediaService } from 'src/media/media.service';
import { successResponse } from 'src/utils';
import { cos } from 'src/config/cos';

@Controller('upload')
export class UploadController {
    constructor(
        private readonly mediaService: MediaService,
    ) { }
    @Post('image')
    @UseInterceptors(FileInterceptor('image', {
        limits: { fileSize: 1024 * 1024 * 5 }, // 限制文件大小为 5MB
    }))
    async uploadCos(@UploadedFile() file: Express.Multer.File) {
        const bucket = 'season-1313247063';
        const region = 'ap-chengdu';
        const md5Hash = crypto.createHash('md5').update(file.buffer).digest('hex');
        const key = `uploads/${md5Hash}${path.extname(file.originalname)}`;

        return new Promise((resolve, reject) => {
            cos.putObject({
                Bucket: bucket,
                Region: region,
                Key: key,
                Body: file.buffer,
            }, async (err) => {
                if (err) {
                    reject(err);
                } else {
                    const url = `https://${bucket}.cos.${region}.myqcloud.com/${key}`;
                    resolve(successResponse({
                        url,
                    }));
                }
            });
        });
    }
}
