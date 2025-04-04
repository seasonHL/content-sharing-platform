import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post, Like, Media, User } from 'src/entities';
import { ICreatePost } from 'src/types/post';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private readonly postRepository: Repository<Post>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
        @InjectRepository(Media) private readonly mediaRepository: Repository<Media>
    ) { }

    /**
     * 创建帖子及其媒体内容
     */
    async createPostWithMedia(data: ICreatePost): Promise<Post> {
        const post = this.postRepository.create({
            ...data,
            media: data.media.map((mediaData) =>
                this.mediaRepository.create(mediaData),
            ),
        });
        return await this.postRepository.save(post);
    }

    async getPostList(page: number = 1, limit: number = 20) {
        const skip = (page - 1) * limit;

        const posts = await this.postRepository.find({
            relations: ['author', 'media', 'likes'],
            take: limit,
            skip: skip,
        });

        return posts
    }

    /**
     * 获取所有帖子及其关联的媒体内容
     */
    async getAllPosts(): Promise<Post[]> {
        return await this.postRepository.find({
            relations: ['media', 'author'],
        });
    }

    async getPostsByUserId(author_id: number) {
        return this.postRepository.find({
            where: { author_id },
            relations: ['author', 'media', 'comments', 'likes'],
        });
    }

    /**
     * 获取帖子及其关联的媒体内容
     */
    async getPostById(userId: number, postId: number): Promise<Post> {
        const post = await this.postRepository.findOne({
            where: { post_id: postId },
            relations: ['author', 'media', 'comments', 'likes'],
        });
        const user = await this.userRepository.findOne({ where: { user_id: userId } });
        if (!post || !user) {
            return null;
        }
        const isLiked = await this.likeRepository.findOne({ where: { post, user } });

        return { ...post, isLiked: !!isLiked } as Post;
    }
    async likePost(postId: number, userId: number) {
        const post = await this.postRepository.findOne({ where: { post_id: postId } });
        const user = await this.userRepository.findOne({ where: { user_id: userId } });

        if (!post || !user) {
            return false;
        }

        const existingLike = await this.likeRepository.findOne({ where: { post, user } });
        if (existingLike) {
            return false; // 已经点过赞
        }

        const newLike = this.likeRepository.create({ post, user });
        await this.likeRepository.save(newLike);
        const likeCount = await this.likeRepository.count({ where: { post } });
        return {
            isLiked: true,
            likeCount
        }
    }

    async unlikePost(postId: number, userId: number) {
        const post = await this.postRepository.findOne({ where: { post_id: postId } });
        const user = await this.userRepository.findOne({ where: { user_id: userId } });

        if (!post || !user) {
            return false;
        }

        const existingLike = await this.likeRepository.findOne({ where: { post, user } });
        if (!existingLike) {
            return false; // 没有点过赞
        }

        await this.likeRepository.remove(existingLike);
        const likeCount = await this.likeRepository.count({ where: { post } });
        return {
            isLiked: false,
            likeCount
        };
    }

    async getLikeCount(postId: number): Promise<number> {
        return await this.likeRepository.count({ where: { post: { post_id: postId } } });
    }

    async commentPost() {
        throw new Error('Method not implemented.');
    }
    async sharePost() {
        throw new Error('Method not implemented.');
    }
    async deletePost(id: number) {
        this.postRepository.delete(id);
    }
}
