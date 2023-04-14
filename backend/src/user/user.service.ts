import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/role/role.entity';
import { RoleName } from 'src/role/role.enum';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(Role) 
        private roleRepository: Repository<Role>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async getAll(): Promise<User[]> {
        const users = await this.userRepository.find();
        if(!users.length) throw new NotFoundException(new MessageDto('The list of users is empty'));
        return users;
    }

    async create(users: CreateUserDto): Promise<any> {
        const { username, email} = users
        const exists = await this.userRepository.findOne({
            where: [
                { username: username },
                { email: email }
            ]
        }); 
        if(exists) throw new NotFoundException(new MessageDto('The user alreasy exist'));
        const roleAdmin = await this.roleRepository.findOne({
            where: {roleName: RoleName.ADMIN}
        })
        const roleUser = await this.roleRepository.findOne({
            where: {roleName: RoleName.USER}
        })
        if(!roleAdmin || !roleUser) throw new InternalServerErrorException(new MessageDto('Not roles created yet'));
        const admin = this.userRepository.create(users);
        admin.roles = [roleAdmin, roleUser];
        await this.userRepository.save(admin);
        return new MessageDto('Admin created');
    }
}
