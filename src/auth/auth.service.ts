import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { pick } from 'src/utils';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) { }
    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne({ username });
        if (user?.password !== pass) {
            throw new UnauthorizedException("账号或密码错误");
        }

        const payload = pick(user, ['user_id', 'username']);
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
