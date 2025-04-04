import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Media } from "./media.entity";
import { User } from "./user.entity";
import { EComment } from "./comment.entity";

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
}