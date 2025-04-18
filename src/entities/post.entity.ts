import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Media } from "./media.entity";
import { User } from "./user.entity";
import { EComment } from "./comment.entity";
import { Like } from "./like.entity";
import { Expose, Transform } from "class-transformer";
import { pick } from "src/utils";

class PostRelation {
    /** 媒体关联，一对多关系，级联删除 */
    @OneToMany(() => Media, media => media.post, { cascade: true })
    media: Media[];
    /** 用户关联，多对一关系 */
    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'author_id' })
    author: User;
    /** 评论关联，一对多关系 */
    @OneToMany(() => EComment, comment => comment.post)
    comments: EComment[];
    /** 点赞关联，一对多关系 */
    @OneToMany(() => Like, (like) => like.post)
    likes: Like[];
}
/** 帖子实体类 */
@Entity('posts')
export class Post extends PostRelation {
    /** 帖子ID，自增长，主键 */
    @PrimaryGeneratedColumn()
    post_id: number;
    /** 标题，最大长度 255 字符 */
    @Column({ length: 255 })
    title: string;
    /** 内容，存储详细描述 */
    @Column({ type: 'text' })
    content: string;
    /** 作者 ID，用于与用户表关联 */
    @Column()
    author_id: number;
    /** 创建时间，默认当前时间 */
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    /** 更新时间，自动更新 */
    @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
    /** 是否发布，布尔值，默认已发布 */
    @Column({ default: true })
    is_published: boolean;

    isLiked: boolean;
}

export class PostDto extends Post {
    @Transform(({ value }) => value.map(media => pick(media, ['media_url', 'media_type'])))
    media: Media[];
    @Transform(({ value }) => typeof value === 'object' ? value.length : value)
    comments: EComment[];
    @Transform(({ value }) => typeof value === 'object' ? value.length : value)
    likes: Like[];
    @Expose()
    get commentCount() {
        return this.comments
    }
    @Expose()
    get likeCount() {
        return this.likes
    }
}

export class PostListDto {
    @Transform(({ value }) => value.map(post => ({
        ...post,
        likeCount: post.likes.length,
    })))
    data: PostDto[];
}