import { IsNotEmpty, IsEnum, ValidateNested, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'
import { UserType } from './user.type'
import { SeatType } from './seat.type'
import { ClassType, State } from '../enums/general.enum'

export class BookingType {
    @IsEnum(ClassType)
    type: string

    @IsNumber()
    @IsNotEmpty()
    place: number

    @IsEnum(State)
    state: string

    @ValidateNested()
    @Type(() => UserType)
    cllient: UserType

    @ValidateNested()
    @Type(() => SeatType)
    seat: SeatType
}
