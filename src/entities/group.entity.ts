import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('groups')
export class Group {
    /** 群组 ID，自增长，主键 */
    @PrimaryGeneratedColumn()
    id: number;
    /** 群组名称 */
    @Column({ name: 'group_name' })
    groupName: string;
    /** 群组头像 */
    @Column({ name: 'group_avatar', default: '' })
    groupAvatar: string;
    /** 创建者 ID */
    @Column({ name: 'creator_id' })
    creatorId: number;
}