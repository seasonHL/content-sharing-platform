import { ClassSerializerInterceptor, Controller, Get, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { MediaService } from './media.service';
import { Media } from 'src/entities/media.entity';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({ type: Media })
    @Get('list')
    async getMediaList() {
        const medias = await this.mediaService.getMedias();
        return medias;
    }
}
