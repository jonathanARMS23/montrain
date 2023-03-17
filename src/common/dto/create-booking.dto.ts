import { IsNotEmpty, ValidateNested, IsEnum } from 'class-validator'
import { Type } from 'class-transformer'
import { SeatType } from '../types/seat.type'
import { UserType } from '../types/user.type'
import { ClassType, State } from '../enums/general.enum'

export class CreateBookingDTO {
    @IsEnum(ClassType)
    type: string

    @IsNotEmpty()
    place: number

    @IsEnum(State)
    state: string

    @ValidateNested()
    @Type(() => UserType)
    client: UserType

    @ValidateNested()
    @Type(() => SeatType)
    seat: SeatType
}
