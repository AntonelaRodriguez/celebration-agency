import { hash } from "bcryptjs";
import { Product } from "src/product/entities/product.entity";
import { Role } from "src/role/role.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'user'})
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 20, nullable: true})
    name: string;

    @Column({type: 'varchar', length: 20, nullable: false, unique: true})
    username: string;

    @Column({type: 'varchar', length: 20, nullable: false, unique: true})
    email: string;

    @Column({type: 'varchar', nullable: false})
    password: string;

    @ManyToMany(type => Role, role => role.users, {eager: true})
    @JoinTable({
        name: 'user_role',
        joinColumn: {name: 'user_id'},
        inverseJoinColumn: {name: 'role_id'}
    })
    roles: Role[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if(!this.password) return;
        this.password = await hash(this.password,20)
    }
    
    @OneToMany(()=> Product, product => product.author)
    products: Product[]
}