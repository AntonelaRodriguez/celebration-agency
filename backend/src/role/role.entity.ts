import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { RoleName } from "./role.enum";
import { User } from "src/user/user.entity";

@Entity({name: 'role'})
export class Role {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 20, nullable: false, unique: true})
    roleName: RoleName;

    @ManyToMany(type => User, user => user.roles)
    users:User[];
}