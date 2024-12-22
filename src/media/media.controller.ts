import { Controller, Get } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Get('list')
    async getMediaList() {
        const medias = await this.mediaService.getMedias();
        return medias.map(item => ({
            ...item,
            post: item.post.post_id
        }));
    }
}
