import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class SeatType {
    @IsString()
    @IsNotEmpty()
    start: string

    @IsString()
    @IsNotEmpty()
    reach: string

    @IsString()
    @IsNotEmpty()
    start_time: string

    @IsString()
    @IsNotEmpty()
    reach_time: string

    @IsString()
    @IsNotEmpty()
    date: string

    @IsNumber()
    @IsNotEmpty()
    firstclass: number

    @IsNumber()
    @IsNotEmpty()
    secondclass: number
}
