import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { ICreatePost } from 'src/types/post';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get('list')
    async getPostList() {
        return await this.postService.getAllPosts();
    }

    @Post('create')
    async createPost(@Body() data: ICreatePost) {
        return await this.postService.createPostWithMedia(data);
    }
}
