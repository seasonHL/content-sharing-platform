import { ConfigModuleOptions } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Group, Media, Message, Post, Product, User, UserGroup } from "src/entities";

export const typeormOptions: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin123',
    database: 'content_sharing_platform',
    entities: [User, Post, Media, Message, Group, UserGroup, Product],
    synchronize: true,
}

export const configOptions: ConfigModuleOptions = {
    isGlobal: true,
    envFilePath: ['.env.development', '.env.production']
}

export const jwtOptions = {
    secret: 'secret',
}