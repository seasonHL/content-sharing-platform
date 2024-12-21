import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/** 用户实体类 */
@Entity('users')
export class User {
    /** 用户ID，自增长，主键 */
    @PrimaryGeneratedColumn()
    user_id: number;
    @Column()
    /** 用户名，最大长度50字符，不为空 */
    @Column()
    username: string;
    /** 密码，最大长度255字符，不为空 */
    @Column()
    password: string;
    /** 电子邮件，最大长度100字符，不为空 */
    @Column()
    email: string;
    /** 创建时间，默认当前时间 */
    @Column({
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: Date;
    /** 更新时间，自动更新 */
    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    updated_at: Date;
    /** 角色，最大长度20字符 */
    @Column({ default: 'user' })
    role: string;
    /** 头像，存储头像 URL 或文件路径 */
    @Column({ default: null })
    avatar: string;
    /** 简介，存储用户的个人简介 */
    @Column({ default: null })
    bio: string;
    /** 性别，枚举类型 */
    @Column({ default: null })
    gender: string;
    /** 生日，存储用户的出生日期 */
    @Column({ default: null })
    birthdate: Date;
}