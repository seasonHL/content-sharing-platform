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

    joinGroup(data: Pick<UserGroup, "groupId" | "userId">) {
        return this.userGroupRep.save(data);
    }

    quitGroup(data: Pick<UserGroup, "groupId" | "userId">) {
        return this.userGroupRep.delete(data);
    }

    changeRole(data) {
        return this.userGroupRep.update(pick(data, ['userId', 'groupId']), { role: data.role });
    }

    findGroupByUserId(userId: number) {
        return this.userGroupRep.find({ where: { userId } });
    }

    findUserByGroupId(groupId: number) {
        return this.userGroupRep.find({ where: { groupId } });
    }
}
