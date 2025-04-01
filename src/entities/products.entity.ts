import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cart } from './cart.entity';

class ProductRelation {
    /** 购物车 */
    @OneToMany(() => Cart, (cart) => cart.products)
    carts: Cart[];
}

@Entity('products')
export class Product extends ProductRelation {
    @PrimaryGeneratedColumn()
    id: number;
    /** 商品名称 */
    @Column()
    name: string;
    /** 商品图片 */
    @Column()
    image: string;
    /** 商品价格 */
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
    /** 商品描述 */
    @Column({ nullable: true })
    description: string;
}