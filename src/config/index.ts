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

        const host = configService.get<string>('POSTGRES_HOST') ?? configService.get<string>('DB_HOST');
        const port =
            configService.get<number>('POSTGRES_PORT') ??
            configService.get<number>('DB_PORT') ??
            6543;
        const username = configService.get<string>('POSTGRES_USER') ?? configService.get<string>('DB_USERNAME');
        const password = configService.get<string>('POSTGRES_PASSWORD') ?? configService.get<string>('DB_PASSWORD');
        const database = configService.get<string>('POSTGRES_DATABASE') ?? configService.get<string>('DB_DATABASE') ?? 'postgres';

        return {
            type: 'postgres',
            host,
            port,
            username,
            password,
            database,
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
