import {
    Repository,
    DeleteResult,
    SaveOptions,
    RemoveOptions,
    FindOptionsWhere,
    FindManyOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Injectable } from '@nestjs/common';

/**
 * 基础service
 */
@Injectable()
export class BaseService<T> {
    protected readonly repository: Repository<T>;
    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    async saveOne(entity: T, options?: SaveOptions): Promise<T> {
        return this.repository.save(entity, options);
    }

    async saveMany(entities: T[], options?: SaveOptions): Promise<T[]> {
        return this.repository.save(entities, options);
    }

    async findOne(options?: FindOptionsWhere<T>): Promise<T> {
        return this.repository.findOneBy(options);
    }

    async findMany(options?: FindManyOptions<T>): Promise<T[]> {
        return this.repository.find(options);
    }

    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async removeOne(entity: T, options?: RemoveOptions): Promise<T> {
        return this.repository.remove(entity, options);
    }

    async removeMany(entities: T[], options?: RemoveOptions): Promise<T[]> {
        return this.repository.remove(entities, options);
    }

    async delete(options?: FindOptionsWhere<T>): Promise<DeleteResult> {
        return this.repository.delete(options);
    }

    async update(
        conditions: number | FindOptionsWhere<T>,
        newValue: QueryDeepPartialEntity<T>,
    ): Promise<number> {
        let updateResult = 1;
        await this.repository
            .update(conditions, newValue)
            .catch(() => (updateResult = 0));
        return updateResult;
    }
}