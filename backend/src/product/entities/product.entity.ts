import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({name: 'product'})
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    address: string;

    @Column({ type: 'date', nullable: false })
    date: Date;

    @Column({ type: 'time', nullable: false })
    hour: string;

    @Column({ default: 4 })
    authorId: number

    @ManyToOne(() => User, user => user.products)
    author: User
    
    passwor: any;
}
