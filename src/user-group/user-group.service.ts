import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { UserGroup } from 'src/entities';
import { pick } from 'src/utils';
import { Repository } from 'typeorm';

@Injectable()
export class UserGroupService extends BaseService<UserGroup> {
    constructor(@InjectRepository(UserGroup) private readonly userGroupRep: Repository<UserGroup>) {
        super(userGroupRep);
    }
    /**
     * 加入一个群组
     * @param data - 包含群组ID和用户ID的对象
     * @returns 加入成功后的群组对象
     */
    joinGroup(data: Pick<UserGroup, "groupId" | "userId">) {
        return this.userGroupRep.save(data);
    }
    /**
     * 退出一个群组
     * @param data - 包含群组ID和用户ID的对象
     * @returns 退出成功后的群组对象
     */
    quitGroup(data: Pick<UserGroup, "groupId" | "userId">) {
        return this.userGroupRep.delete(data);
    }
    /**
     * 更改用户在群组中的角色
     * @param data - 包含用户ID、群组ID和新角色的对象
     * @returns 更新成功后的群组对象
     */
    changeRole(data: UserGroup) {
        return this.userGroupRep.update(pick(data, ['userId', 'groupId']), { role: data.role });
    }
    /**
     * 根据用户ID查找群组
     * @param userId - 用户ID
     * @returns 包含群组信息的数组
     */
    findGroupByUserId(userId: number) {
        return this.userGroupRep.find({ where: { userId } });
    }
    /**
     * 根据群组ID查找用户
     * @param groupId - 群组ID
     * @returns 包含用户信息的数组
     */
    findUserByGroupId(groupId: number) {
        return this.userGroupRep.find({ where: { groupId } });
    }
}
