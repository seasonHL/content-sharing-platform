import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { Product } from '../entities/products.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart) private cartRepository: Repository<Cart>,
        @InjectRepository(Product) private productRepository: Repository<Product>
    ) { }

    // 添加商品到购物车
    async addToCart(userId: number, productIds: number[]) {
        const cart = await this.cartRepository.findOne({
            where: { user: { user_id: userId } },
            relations: ['products']
        });

        if (!cart) {
            const newCart = this.cartRepository.create({
                user: { user_id: userId },
                products: []
            });
            const products = await this.productRepository.findByIds(productIds);
            newCart.products = products;
            return await this.cartRepository.save(newCart);
        }

        const newProducts = await this.productRepository.findByIds(productIds);
        cart.products = [...cart.products, ...newProducts];
        return await this.cartRepository.save(cart);
    }

    // 获取用户的购物车列表
    async getCartList(userId: number) {
        return await this.cartRepository.findOne({
            where: { user: { user_id: userId } },
            relations: ['products']
        });
    }

    // 从购物车中移除商品
    async removeFromCart(cartId: number, productId: number) {
        const cart = await this.cartRepository.findOne({
            where: { id: cartId },
            relations: ['products']
        });

        if (cart) {
            cart.products = cart.products.filter(product => product.id !== productId);
            return await this.cartRepository.save(cart);
        }
        return null;
    }
}