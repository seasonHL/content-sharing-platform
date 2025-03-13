import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
      },
    }),
    inject: [ConfigService],
    global: true,
  }), UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, {
    provide: 'APP_GUARD',
    useClass: AuthGuard,
  }],
  exports: [AuthService, JwtService]
})
export class AuthModule { }
