import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Media } from 'src/entities/media.entity';

@Injectable()
export class MediaService extends BaseService<Media> {
    constructor(@InjectRepository(Media) private readonly mediaRep) {
        super(mediaRep);
    }

    async getMedias() {
        return await this.mediaRep.find();
    }
}
