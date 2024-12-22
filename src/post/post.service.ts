import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from 'src/entities/media.entity';
import { Post } from 'src/entities/post.entity';
import { ICreatePost } from 'src/types/post';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private readonly postRepository: Repository<Post>,
        @InjectRepository(Media) private readonly mediaRepository: Repository<Media>
    ) { }

    /**
     * 创建帖子及其媒体内容
     */
    async createPostWithMedia(data: ICreatePost): Promise<Post> {
        return await this.postRepository.save(data);
    }

    /**
     * 获取所有帖子及其关联的媒体内容
     */
    async getAllPosts(): Promise<Post[]> {
        return await this.postRepository.find();
    }

    /**
     * 获取帖子及其关联的媒体内容
     */
    async getPostById(post_id: number): Promise<Post> {
        return await this.postRepository.findOne({
            where: { post_id },
        });
    }
}
