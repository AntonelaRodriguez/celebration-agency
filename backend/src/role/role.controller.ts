import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('role')
export class RoleController {

    constructor(
        private readonly roleService: RoleService
    ){}

    @Get()
    getAll(){
        return this.roleService.getAll();
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    create(@Body() roles: CreateRoleDto){
        return this.roleService.create(roles);
    }
}
