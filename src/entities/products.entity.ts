import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
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