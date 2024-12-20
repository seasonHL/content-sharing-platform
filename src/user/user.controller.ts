import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { failResponse, pick, successResponse } from 'src/utils';
import { User } from './user.entity';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('find')
    async find(@Query() params: User, @Res() res: Response) {
        if (!params.user_id) {
            res.status(HttpStatus.BAD_REQUEST);
            res.send(failResponse('user_id is required'));
            return;
        }
        const user = await this.userService.findOne(pick(params, 'user_id'));
        return successResponse(user);
    }

    @Post('update')
    async update(@Body() body: User, @Res() res: Response) {
        if (!body.user_id) {
            res.status(HttpStatus.BAD_REQUEST);
            res.send(failResponse('user_id is required'));
            return;
        }
        await this.userService.update(body.user_id, body);
        return successResponse('user update successfully');
    }
}
