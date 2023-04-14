import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDto } from './dto/new-user.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Get()
    getAll(){
        return this.authService.getAll();
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('new')
    create(@Body() users: NewUserDto){
        return this.authService.create(users);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('login')
    login(@Body() users: LoginUserDto){
        return this.authService.login(users);
    }
}
