import { ConfigModuleOptions } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Media } from "src/entities/media.entity";
import { Message } from "src/entities/message.entity";
import { Post } from "src/entities/post.entity";
import { User } from "src/entities/user.entity";

export const typeormOptions: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin123',
    database: 'content_sharing_platform',
    entities: [User, Post, Media, Message],
    synchronize: true,
}

export const configOptions: ConfigModuleOptions = {
    isGlobal: true,
    envFilePath: ['.env.development', '.env.production']
} 