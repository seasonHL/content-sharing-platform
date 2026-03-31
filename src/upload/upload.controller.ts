import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as crypto from 'crypto';
import { successResponse } from 'src/utils';
import { ConfigService } from '@nestjs/config';
import { put } from '@vercel/blob';

@Controller('upload')
export class UploadController {
    constructor(
        private readonly configService: ConfigService
    ) { }

    uploadToVercelBlob = async (file: Express.Multer.File) => {
        const md5Hash = crypto.createHash('md5').update(file.buffer).digest('hex');
        const key = `uploads/${md5Hash}${path.extname(file.originalname)}`;
        const token = this.configService.get<string>('BLOB_READ_WRITE_TOKEN');

        const result = await put(key, file.buffer, {
            access: 'public',
            token,
            addRandomSuffix: false,
        })

        return result.url;
    }

    @Post('image')
    @UseInterceptors(FileInterceptor('image', {
        limits: { fileSize: 1024 * 1024 * 5 }, // 限制文件大小为 5MB
    }))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        const url = await this.uploadToVercelBlob(file);
        return successResponse(url);
    }


    @Post('images')
    @UseInterceptors(FilesInterceptor('images'))
    async uploadImages(@UploadedFiles() files: Array<Express.Multer.File>) {
        const res = await Promise.all(files.map((file) => this.uploadToVercelBlob(file)));
        return successResponse(res);
    }

}
