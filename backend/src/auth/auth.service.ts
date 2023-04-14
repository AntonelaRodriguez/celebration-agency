import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/role.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Auth } from './auth.repository';
import { NewUserDto } from './dto/new-user.dto';
import { MessageDto } from 'src/common/message.dto';
import { RoleName } from 'src/role/role.enum';
import { LoginUserDto } from './dto/login.dto';
import { compare } from 'bcryptjs';
import { PayloadIterface } from './payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(Role) 
        private roleRepository: Repository<Role>,
        @InjectRepository(User)
        private readonly authRepository: Auth,
        private readonly jwtService: JwtService
    ) {}

    async getAll(): Promise<User[]> {
        const users = await this.authRepository.find();
        if(!users.length) throw new NotFoundException(new MessageDto('The list of users is empty'));
        return users;
    }

    async create(dto: NewUserDto): Promise<any> {
        const { username, email } = dto
        const exists = await this.authRepository.findOne({
            where: [
                { username: username },
                { email: email }
            ]
        }); 
        if(exists) throw new BadRequestException(new MessageDto('The user alreasy exist'));
        const roleUser = await this.roleRepository.findOne({
            where: {roleName: RoleName.USER}
        })
        if(!roleUser) throw new InternalServerErrorException(new MessageDto('Not roles created yet'));
        const user = this.authRepository.create(dto);
        user.roles = [roleUser];
        await this.authRepository.save(user);
        return new MessageDto('User created');
    }

    async login(dto: LoginUserDto): Promise<any> {
        const {username} = dto;
        const user = await this.authRepository.findOne({where: [{ username: username }, { email: username }]});
        if(!user) return new UnauthorizedException(new MessageDto('User not exist'));
        const passwordOk = await compare(dto.password, user.password);
        if(!passwordOk) return new UnauthorizedException(new MessageDto('Wrong password'));
        const payload: PayloadIterface = {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles.map(role => role.roleName as RoleName)
        }
        const token = await this.jwtService.sign(payload);
        return {token};
    }
}
