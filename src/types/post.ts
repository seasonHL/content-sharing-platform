import { Media } from "src/entities/media.entity";
import { Post } from "src/entities/post.entity";

/**
 * 创建帖子请求体
 */
export type ICreatePost = Pick<Post, 'title' | 'content' | 'author_id'> & {
    media: Pick<Media, 'media_url' | 'media_type'>[];
} 