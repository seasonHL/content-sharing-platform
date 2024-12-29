import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [JwtModule.register({
    global: true,
    signOptions: { expiresIn: '1d' },
  }), UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, {
    provide: 'APP_GUARD',
    useClass: AuthGuard,
  }],
  exports: [AuthService, JwtService]
})
export class AuthModule { }
