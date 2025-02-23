import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation {
    // 自动生成的主键
    @PrimaryGeneratedColumn()
    conversation_id: number;

    // 用户 ID 列
    @Column()
    user_id: number;

    // 会话标题列
    @Column({ default: '' })
    title: string;

    // 最后更新时间列
    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    updated_at: Date;

    // 头像列
    @Column({ default: '' })
    avatar: string;

    // 最后一条消息列
    @Column({ default: '' })
    last_message: string;

    // 未读消息数量列
    @Column({ default: 0 })
    unread: number;

    // 好友 ID 列
    @Column({ default: null })
    friend_id: number;

    // 群组 ID 列
    @Column({ default: null })
    group_id: number;

    @OneToMany(() => Message, (message) => message.conversation)
    messages: Message[];
}