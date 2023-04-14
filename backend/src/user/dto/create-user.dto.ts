import { IsEmail, IsString, MaxLength } from "class-validator"
import { IsNotBlank } from "src/decorators/is-not-blank.decorator"

export class CreateUserDto {

    @IsString()
    @MaxLength(20, {message: 'No longer than 20 characters'})
    name: string

    @IsNotBlank({message: 'Cannot be empty'})
    @MaxLength(20, {message: 'No longer than 20 characters'})
    username: string

    @IsEmail()
    email: string

    @IsNotBlank({message: 'Cannot be empty'})
    password: string
    
}