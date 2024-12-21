import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { failResponse, pick, successResponse } from 'src/utils';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('find')
    async find(@Query() params: User) {
        if (!params.user_id) {
            throw new HttpException(failResponse('user_id is required'), HttpStatus.BAD_REQUEST);
        }
        const user = await this.userService.findMany({ where: pick(params, ['user_id', 'username']) });
        return successResponse(user);
    }

    @Post('update')
    async update(@Body() body: User) {
        if (!body.user_id) {
            throw new HttpException(failResponse('user_id is required'), HttpStatus.BAD_REQUEST);
        }
        await this.userService.update(body.user_id, body);
        return successResponse('user update successfully');
    }
}
