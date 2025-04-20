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

    async search(keyword: string, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        return this.userRep.createQueryBuilder('user')
            .where('user.username LIKE :keyword OR user.email LIKE :keyword', { keyword: `%${keyword}%` })
            .orWhere('user.user_id LIKE :keyword', { keyword: `%${keyword}%` })
            .skip(skip)
            .take(limit)
            .getMany();
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
