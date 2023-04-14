import { MaxLength } from "class-validator"
import { IsNotBlank } from "src/decorators/is-not-blank.decorator"

export class LoginUserDto {

    @IsNotBlank({message: 'Cannot be empty'})
    @MaxLength(20, {message: 'No longer than 20 characters'})
    username: string

    @IsNotBlank({message: 'Cannot be empty'})
    password: string
}