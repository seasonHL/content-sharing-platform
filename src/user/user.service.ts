import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(@InjectRepository(User) private readonly userRep: Repository<User>) {
        super(userRep);
    }

    async findByUserId(user_id: number): Promise<User | null> {
        return this.userRep.findOne({ where: { user_id } });
    }

    async findByUsername(username: string): Promise<User[] | null> {
        return this.userRep.find({ where: { username } });
    }

    async findByEmail(email: string): Promise<User[] | null> {
        return this.userRep.find({ where: { email } });
    }
}
