import { ConfigModule, ConfigModuleOptions, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const typeormOptions: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 6543,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [join(__dirname, '../**', '*.entity{.ts,.js}')],
    synchronize: true,
    ssl: {
        rejectUnauthorized: false,
    },
}

export const TypeOrmConfigModule = TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const databaseUrl =
            configService.get<string>('POSTGRES_URL') ||
            configService.get<string>('POSTGRES_PRISMA_URL') ||
            configService.get<string>('SUPABASE_DB_URL');
        const shouldUseSsl = configService.get('DB_SSL', 'true') === 'true';

        if (databaseUrl) {
            return {
                type: 'postgres',
                url: databaseUrl,
                entities: [join(__dirname, '../**', '*.entity{.ts,.js}')],
                synchronize: true,
                ssl: shouldUseSsl
                    ? {
                        rejectUnauthorized: false,
                    }
                    : false,
            };
        }

        return {
            type: 'postgres',
            host: configService.get('POSTGRES_HOST', configService.get('DB_HOST')),
            port: configService.get<number>('DB_PORT', 6543),
            username: configService.get('POSTGRES_USER', configService.get('DB_USERNAME')),
            password: configService.get('POSTGRES_PASSWORD', configService.get('DB_PASSWORD')),
            database: configService.get('POSTGRES_DATABASE', configService.get('DB_DATABASE', 'postgres')),
            entities: [join(__dirname, '../**', '*.entity{.ts,.js}')],
            synchronize: true,
            ssl: shouldUseSsl
                ? {
                    rejectUnauthorized: false,
                }
                : false,
        };
    },
    inject: [ConfigService],
})

export const configOptions: ConfigModuleOptions = {
    isGlobal: true,
    envFilePath: ['.env.development', '.env.production']
}

export const jwtOptions = {
    secret: 'secret',
}
