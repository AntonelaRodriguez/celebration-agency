import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ){}

    async getAll(): Promise<Role[]> {
        const roles = await this.roleRepository.find();
        if(!roles.length) throw new NotFoundException(new MessageDto('The list of role is empty'));
        return roles;
    }

    async create(roles: CreateRoleDto): Promise<any> {
        const exists = await this.roleRepository.findOne({
            where: {
                roleName: roles.roleName
            }
        }); 
        if(exists) throw new NotFoundException(new MessageDto('The role doesnt exist'));
        await this.roleRepository.save(roles as Role)
        return new MessageDto('Role created')
    }
}
