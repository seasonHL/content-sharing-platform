import { ConfigModule, ConfigModuleOptions, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const typeormOptions: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin123',
    database: 'content_sharing_platform',
    entities: [join(__dirname, '../**', '*.entity{.ts,.js}')],
    synchronize: true,
}

export const TypeOrmConfigModule = TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [join(__dirname, '../**', '*.entity{.ts,.js}')],
        synchronize: true,
    }),
    inject: [ConfigService],
})

export const configOptions: ConfigModuleOptions = {
    isGlobal: true,
    envFilePath: ['.env.development', '.env.production']
}

export const jwtOptions = {
    secret: 'secret',
}