import { IsString, IsNotEmpty, IsDateString } from 'class-validator'

export class CreateSeatDTO {
    @IsString()
    @IsNotEmpty()
    start: string

    @IsString()
    @IsNotEmpty()
    reach: string

    @IsDateString()
    @IsNotEmpty()
    start_time: string

    @IsDateString()
    @IsNotEmpty()
    reach_time: string

    @IsDateString()
    @IsNotEmpty()
    date: string

    @IsNotEmpty()
    firstclass: number

    @IsNotEmpty()
    secondclass: number
}
