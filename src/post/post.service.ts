import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post, Like, Media, User, Conversation } from 'src/entities';
import { ICreatePost } from 'src/types/post';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private readonly postRepository: Repository<Post>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
        @InjectRepository(Media) private readonly mediaRepository: Repository<Media>,
        @InjectRepository(Conversation) private readonly conversationRep: Repository<Conversation>,
        private readonly messageService: MessageService,

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
    /**
     * 获取所有帖子及其关联的媒体内容
     */
    async getPostList(page: number = 1, limit: number = 20) {
        const skip = (page - 1) * limit;

        const posts = await this.postRepository.find({
            relations: ['author', 'media', 'likes'],
            take: limit,
            skip: skip,
        });

        return posts
    }

    async searchPost(keyword: string, page: number = 1, limit: number = 20) {
        const skip = (page - 1) * limit;

        const posts = await this.postRepository.createQueryBuilder('post')
            .leftJoinAndSelect('post.media', 'media') // 关联媒体内容
            .leftJoinAndSelect('post.author', 'author') // 关联作者信息
            .leftJoinAndSelect('post.likes', 'likes') // 关联点赞信息
            .where('post.content LIKE :keyword OR post.title LIKE :keyword', { keyword: `%${keyword}%` }) // 搜索标题或内容
            .take(limit) // 每页数量
            .skip(skip) // 跳过的记录数
            .getMany(); // 获取查询结果

        return posts;
    }
    /**
     * 获取用户的所有帖子及其关联的媒体内容
     */
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
    /**
     * 点赞帖子
     */
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
    /**
     * 取消点赞
     */
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
    /**
     * 获取点赞数
     */
    async getLikeCount(postId: number): Promise<number> {
        return await this.likeRepository.count({ where: { post: { post_id: postId } } });
    }

    async commentPost() {
        throw new Error('Method not implemented.');
    }
    /**
     * 分享帖子给指定用户
     * @param sender_id - 分享者的用户ID
     * @param receiver_id - 接收者的用户ID
     * @param post_id - 要分享的帖子ID
     */
    async sharePost(sender_id: number, receiver_id: number, post_id: number) {
        const post = await this.postRepository.findOne({ where: { post_id }, relations: ['media', 'author'] });
        if (!post) {
            throw new BadRequestException('帖子不存在');
        }

        const conversation = await this.conversationRep.findOne({
            where: {
                user_id: sender_id,
                friend_id: receiver_id,
            },
        });
        if (!conversation) {
            throw new BadRequestException('会话不存在');
        }

        const messageData = {
            sender_id,
            receiver_id,
            conversation_id: conversation.conversation_id,
            content: `转发了帖子：${post.title}`,
            post_id,
        };

        return this.messageService.receiveMessage(messageData);
    }
    async deletePost(id: number) {
        this.postRepository.delete(id);
    }
}
