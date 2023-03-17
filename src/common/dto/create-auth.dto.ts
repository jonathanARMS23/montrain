import { IsString, IsNotEmpty } from 'class-validator'

export class CreateAuthDTO {
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}
