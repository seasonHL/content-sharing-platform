import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { Product } from './products.entity';

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.carts)
    user: User;

    @ManyToMany(() => Product)
    @JoinTable({
        name: 'cart_products',
        joinColumn: {
            name: 'cart_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        }
    })
    products: Product[];
}