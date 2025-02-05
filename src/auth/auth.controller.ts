import { Body, Controller, Get, Post, Query, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';
import { Request as RequestType } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Public()
    @Post('login')
    async login(@Body() body) {
        const { username, password } = body;
        return this.authService.signIn(username, password);
    }

    @Get('verify')
    async verifyToken(@Request() req: RequestType) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            this.authService.verifyToken(token);
        } catch (error) {
            throw new UnauthorizedException(error)
        }
    }

    @Public()
    @Get('refresh')
    async refreshToken(@Query('token') token: string) {
        try {
            return this.authService.refreshToken(token);
        } catch (error) {
            throw new UnauthorizedException(error)
        }
    }
}
