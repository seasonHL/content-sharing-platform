import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_groups')
export class UserGroup {
    @PrimaryGeneratedColumn()
    id: number;
    /** 用户 ID */
    @Column({ name: 'user_id' })
    userId: number;
    /** 群组 ID */
    @Column({ name: 'group_id' })
    groupId: number;
    /** 角色 */
    @Column({ default: 'member' })
    role: string; // 群主、管理员、普通成员等角色
    /** 加入时间 */
    // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    // joinTime: Date;
}