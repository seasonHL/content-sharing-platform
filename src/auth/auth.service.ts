import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { omit, pick } from 'src/utils';

@Injectable()
export class AuthService {
    private accessTokenOptions;
    private refreshTokenOptions;
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UserService,
        private readonly configService: ConfigService,
    ) {
        this.accessTokenOptions = {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn:
                this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
        }
        this.refreshTokenOptions = {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn:
                this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
        }
    }
    async signIn(username: string, pass: string) {
        const user = await this.usersService.findOne({ username });
        if (user?.password !== pass) {
            throw new UnauthorizedException("账号或密码错误");
        }

        const payload = pick(user, ['user_id', 'username']);
        return this.generateToken(payload);
    }

    async verifyToken(token: string) {
        return this.jwtService.verifyAsync(token, this.accessTokenOptions);
    }

    async refreshToken(token: string) {
        const payload = await this.jwtService.verifyAsync(token, this.refreshTokenOptions);
        return this.generateToken(payload);
    }

    async generateToken(originPayload) {
        const payload = omit(originPayload, ['exp', 'iat']);
        const access_token = this.jwtService.sign(payload,
            this.accessTokenOptions
        );
        const refresh_token = this.jwtService.sign(payload, this.refreshTokenOptions);
        return { access_token, refresh_token };
    }
}
