import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Product } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService extends BaseService<Product> {
    constructor(@InjectRepository(Product) private repo: Repository<Product>) {
        super(repo);
    }

    /**
     * 创建商品
     */
    async createProduct(product: Product) {
        return await this.repo.save(product);
    }

    /**
     * 获取商品列表
     */
    async getProductList() {
        return await this.repo.find();
    }

    /**
     * 获取商品详情
     */
    async getProductDetail(id: number) {
        return await this.repo.findOne({
            where: {
                id
            }
        })
    }

    /**
     * 更新商品
     */
    async updateProduct(id: number, product: Product) {
        return await this.repo.update(id, product);
    }
    /**
     * 删除商品
     */
    async deleteProduct(id: number) {
        return await this.repo.delete(id);
    }
}
