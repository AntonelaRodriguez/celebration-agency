import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    getAll(){
        return this.userService.getAll();
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    create(@Body() users: CreateUserDto){
        return this.userService.create(users);
    }
}
