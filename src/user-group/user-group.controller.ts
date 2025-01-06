import { Body, Controller, Post } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { UserGroup } from 'src/entities';

@Controller('user-group')
export class UserGroupController {
    constructor(private readonly userGroupService: UserGroupService) { }

    @Post('join')
    async join(@Body() data: Pick<UserGroup, "groupId" | "userId">) {
        return await this.userGroupService.joinGroup(data);
    }

    @Post('quit')
    async quit(@Body() data: Pick<UserGroup, "groupId" | "userId">) {
        return await this.userGroupService.quitGroup(data);
    }

    @Post('change-role')
    async changeRole(@Body() data) {
        return await this.userGroupService.changeRole(data);
    }
}
