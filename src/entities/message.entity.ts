import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('messages')
export class Message {
    /** 消息 ID，自增长，主键 */
    @PrimaryGeneratedColumn()
    id: number;
    /** 发送者 ID */
    @Column()
    sender_id: number;
    /** 接收者 ID */
    @Column()
    receiver_id: number;
    /** 消息内容 */
    @Column()
    content: string;
    /** 消息发送时间 */
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
