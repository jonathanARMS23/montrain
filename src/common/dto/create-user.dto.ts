import { IsString, IsNotEmpty, IsEnum } from 'class-validator'
import { Role } from '../enums/general.enum'

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    firstname: string

    @IsString()
    @IsNotEmpty()
    lastname: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsEnum(Role)
    role: string
}
