import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('likes')
export class Like {
    @PrimaryGeneratedColumn()
    like_id: number;

    @ManyToOne(() => User, (user) => user.likes)
    user: User;

    @ManyToOne(() => Post, (post) => post.likes)
    post: Post;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}