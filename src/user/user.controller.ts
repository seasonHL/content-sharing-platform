import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { failResponse, pick, successResponse } from 'src/utils';
import { User } from '../entities/user.entity';
import { Public } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Public()
    @Post('create')
    async create(@Body() body: User) {
        if (!body.username || !body.password) {
            throw new HttpException(failResponse('username and password are required'), HttpStatus.BAD_REQUEST);
        }
        const user = await this.userService.saveOne(body);
        return successResponse(user);
    }

    @Post('delete')
    async delete(@Body() body: User) {
        if (!body.user_id) {
            throw new HttpException(failResponse('user_id is required'), HttpStatus.BAD_REQUEST);
        }
        await this.userService.delete(pick(body, ['user_id']));
        return successResponse('user delete successfully');
    }

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
        await this.userService.update(body.user_id, { ...body, updated_at: new Date() });
        return successResponse('user update successfully');
    }
}
