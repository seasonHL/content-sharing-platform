import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Group, UserGroup } from 'src/entities';
import { UserGroupService } from 'src/user-group/user-group.service';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService extends BaseService<Group> {

    constructor(
        @InjectRepository(Group) private readonly groupRep: Repository<Group>,
        private readonly userGroupService: UserGroupService,
    ) {
        super(groupRep);
    }
    /**
    * 创建一个新的群组
    * @param data - 包含群组名称和创建者ID的对象
    * @returns 创建成功后的群组对象
    */
    async create(data: Pick<Group, "groupName" | "creatorId">) {
        const group = this.groupRep.create(data);
        return await this.groupRep.save(group);
    }
    /**
     * 加入一个群组
     * @param data - 包含群组ID和用户ID的对象
     * @returns 加入成功后的群组对象
     */
    async join(data: Pick<UserGroup, 'groupId' | 'userId'>) {
        return this.userGroupService.joinGroup(data);
    }
    /**
     * 退出一个群组
     * @param data - 包含群组ID和用户ID的对象
     * @returns 退出成功后的群组对象
     */
    async quit(data: Pick<UserGroup, 'groupId' | 'userId'>) {
        return this.userGroupService.quitGroup(data);
    }
}
