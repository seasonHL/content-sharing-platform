import { Body, Controller, Get, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from 'src/entities';

@Controller('group')
export class GroupController {
    constructor(private groupService: GroupService) { }
    /**
     * @param data 群组信息
     * @description 创建群组
     */
    @Post('create')
    async createGroup(@Body() data: Pick<Group, 'groupName' | 'creatorId'>) {
        const group = await this.groupService.create(data);
        return group;
    }
    /**
     * @todo
     * @param data 群组信息
     * @description 加入群组
     */
    @Post('join')
    async joinGroup(@Body() data) {
        const group = await this.groupService.join(data);
        return group;
    }
    /**
     * @todo
     * @param data 群组信息
     * @description 退出群组
     */
    @Post('quit')
    async quitGroup(@Body() data) {
        const group = await this.groupService.quit(data);
        return group;
    }
    /**
     * @param data 群组信息
     * @description 删除群组
     */
    @Post('delete')
    async deleteGroup(@Body() data: Pick<Group, 'id'>) {
        const group = await this.groupService.delete(data);
        return group;
    }
    /**
     * @param data 群组信息
     * @description 更新群组
     */
    @Post('update')
    async updateGroup(@Body() data: Partial<Group>) {
        const group = await this.groupService.update({ id: data.id }, data);
        return group;
    }
    /**
     * @description 获取群组列表
     */
    @Get('list')
    async getGroupList() {
        const groups = await this.groupService.findAll();
        return groups;
    }
}
