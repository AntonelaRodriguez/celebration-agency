import { IsNotEmpty, IsDateString, IsMilitaryTime } from 'class-validator'
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CreateProductDto {
    
    @IsNotBlank({message: 'Address is required'})
    address?: string;

    @IsNotEmpty()
    @IsDateString()
    date?: Date;

    @IsNotEmpty()
    @IsMilitaryTime()
    hour: string;

    @IsNotEmpty()
    authorId: number
}
